import * as rigo from "rigo-sdk-js";
import * as fs from "fs";
import Contract from "rigo-sdk-js/lib/definitions/rpc/contract";
import Account from "rigo-sdk-js";
import * as ethers from "ethers";

const rweb3 = new rigo.RWeb3("https://rpc1.testnet.rigochain.io");

let result;
let account;
let contract;

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
  const user_pvt =
    "73a3de02194740d25de6aad90ca92a39f820784acd22ad341a1e75eed81c29ec";

  const prvKeyBytes = rigo.Bytes.fromHex(user_pvt);
  const addr = rigo.Account.Import("user", "", prvKeyBytes);
  const vault = await getContractAddress("Vault");

  result = await loadContract(rweb3, "rigo1", user_pvt);
  account = result.account;
  contract = result.contract;

  const amount = ethers.parseEther("10000");

  const execute = await contract.execute(account, "approve", [vault, amount]);
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
  //   await approve();
  await swap();
}

main();
