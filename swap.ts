import * as rigo from "rigo-sdk-js";
import * as fs from "fs";
import Contract from "rigo-sdk-js/lib/definitions/rpc/contract";
import Account from "rigo-sdk-js";
import { setTimeout } from "timers/promises";
import * as ethers from "ethers";

const rweb3 = new rigo.RWeb3("https://rpc1.testnet.rigochain.io");

let result;
let account;
let contract;

let userKey = [
  "892a25db51978297045ade8e6795d6cd819f4dd6a67bb25a6a8e75205a730a6c",
  "10df281fd606f95c6385331379ceb79b3cb9eab3987e1cd18e6b3ff8036853c1",
  "c2d20c9d740ef5d511443cc4c00f53e78041f2099f8691869c10a9205ee5692a",
  "589d73e70c6362c70fd12e04483e2e6c42af99b0f3aec9c994f1fbaed108054c",
  "73a3de02194740d25de6aad90ca92a39f820784acd22ad341a1e75eed81c29ec",
  "66591815971da8532c1745ae1bc9d4b2f568d188602db3e2da97a583968fbbbe",
  "a10c867bcb18dc71750722cb289dd00985df5773c250ac54d018761496993473",
  "57a8c606b96093f28312becb508235cb78cabd975c2950c9bf50fff195c8d75f",
  "252b7b1ef38eaa666a15b1d382c9e8eec83433155b1d2119d29ef39a0966835f",
  "a2c0af08d987bc66c631aa81839974cc0b857fdc2f0052529d5603050ccff1ef",
  "3ec752e4fefd76c296a692e58423421c5f341f62afe4fc10c676194fe66ce29b",
  "b0f10584fa94c4f0f9ea64eeddc2b6ffa0853d5d5381579fe9eb543e85d15c97",
  "eee8cd113b44d7dcf0f59ac92591a678d4566909920e9e8b9f38df4d2d547489",
  "b8643fef9ff1444dbef2eb71f0825c3ca6b90fd50611c289722e7998554b9fef",
];

export const getContractAddress = async (
  contractName: string
): Promise<string> => {
  try {
    const contract = await fs.promises.readFile(
      `./config/${contractName}.contract.json`,
      "utf8"
    );

    const parsedContract = JSON.parse(contract);
    const contractAddress = parsedContract.contractAddress;
    return Promise.resolve(contractAddress.toString());
  } catch (err) {
    throw err;
  }
};

export const loadContract = async (
  rweb3: rigo.RWeb3,
  contractName: string,
  userKey: string
): Promise<any> => {
  try {
    let account;
    if (userKey) {
      const prvKeyBytes = rigo.Bytes.fromHex(userKey);
      account = rigo.Account.Import("user", "", prvKeyBytes);
      await rweb3.syncAccount(account);
    }

    let jsonInterface;

    if (contractName == "Vault") {
      jsonInterface = JSON.parse(
        fs.readFileSync(`./artifacts/Vault.json`, "utf-8")
      );
    } else {
      jsonInterface = JSON.parse(
        fs.readFileSync(`./artifacts/Token.json`, "utf-8")
      );
    }

    const abi = jsonInterface.abi;
    const config = JSON.parse(
      fs.readFileSync(`./config/${contractName}.contract.json`, "utf-8")
    );
    const contractAddress = config.contractAddress;
    const contract = rweb3.createContract(abi, contractAddress);

    return Promise.resolve({ account: account, contract: contract });
  } catch (err) {
    throw err;
  }
};

async function approve() {
  for (let j = 1; j <= 12; j++) {
    for (let i = 0; i < userKey.length; i++) {
      const user_pvt = userKey[i];

      const prvKeyBytes = rigo.Bytes.fromHex(user_pvt);
      const addr = rigo.Account.Import("user", "", prvKeyBytes);
      const vault = await getContractAddress("Vault");

      result = await loadContract(rweb3, `medium${j}`, user_pvt);
      account = result.account;
      contract = result.contract;

      const amount = ethers.parseEther("1000000");

      const execute = await contract.execute(account, "approve", [
        vault,
        amount,
      ]);

      await setTimeout(3000);
      const values = ["0x" + account.address, vault];
      result = await contract.query(account, "allowance", values);
      console.log(result);
    }
  }
}

async function swap() {
  const user_pvt =
    "73a3de02194740d25de6aad90ca92a39f820784acd22ad341a1e75eed81c29ec";

  const prvKeyBytes = rigo.Bytes.fromHex(user_pvt);
  const addr = rigo.Account.Import("user", "", prvKeyBytes);
  const vault = await getContractAddress("Vault");

  result = await loadContract(rweb3, "Vault", user_pvt);
  account = result.account;
  contract = result.contract;

  const token = await getContractAddress("rigo1");

  const amount = ethers.parseEther("1");

  const execute = await contract.execute(account, "lock", [
    "mdl1-ch1",
    account.address,
    token,
    amount,
  ]);
}

async function main() {
  await approve();
  // await swap();
}

main();
