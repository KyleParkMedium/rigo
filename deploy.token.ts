import * as rigo from "rigo-sdk-js";
import * as ethers from "ethers";
import * as fs from "fs";
import { setTimeout } from "timers/promises";

const rweb3 = new rigo.RWeb3("https://rpc1.testnet.rigochain.io");

let prvKeyBytes;
let acct;
let jsonInterface;
let abi;
let bytecode;
let contract;
let contractAddr;
let result;
let save;
let jsonString;

async function deploy(
  name: string,
  symbol: string,
  total: string,
  deployer: string
) {
  prvKeyBytes = rigo.Bytes.fromHex(deployer);
  acct = rigo.Account.Import("test", "", prvKeyBytes);
  await rweb3.syncAccount(acct);
  console.log(acct);

  const totalSupply = ethers.parseEther(total);
  // console.log(totalSupply.length);

  // token
  jsonInterface = JSON.parse(
    fs.readFileSync("./artifacts/Token.json", "utf-8")
  );
  abi = jsonInterface.abi;
  bytecode = jsonInterface.bytecode;
  contract = rweb3.createContract(abi);
  result = await contract.deploy(acct, bytecode, [name, symbol, totalSupply]);
  console.log(result);
  await setTimeout(5000);
  contractAddr = await contract.getContractAddress(result.hash);
  save = {
    deployer: acct.address,
    contract: name,
    contractAddress: contractAddr,
    txHash: result.hash,
  };
  jsonString = JSON.stringify(save);
  await fs.promises.writeFile(`config/${name}.contract.json`, jsonString);
}

async function main() {
  deploy(
    "medium6",
    "MED6",
    "1000000",
    "66591815971da8532c1745ae1bc9d4b2f568d188602db3e2da97a583968fbbbe"
  );
}

main();
