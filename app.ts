import * as rigo from "rigo-sdk-js";
import * as fs from "fs";
import * as ethers from "ethers";
import { setTimeout } from "timers/promises";
import * as web3 from "web3";

import { Bytes, RWeb3, Subscriber, TrxBuilder } from "rigo-sdk-js";

const rweb3 = new rigo.RWeb3("http://10.40.10.98:26657");
// const rweb3 = new rigo.RWeb3("http://192.168.100.214:26657");

let prvKeyBytes;
let acct;

async function deploy() {
  prvKeyBytes = rigo.Bytes.fromHex(
    "10df281fd606f95c6385331379ceb79b3cb9eab3987e1cd18e6b3ff8036853c1"
  );
  acct = rigo.Account.Import("mediator1", "", prvKeyBytes);
  console.log("mediator : ", acct);

  prvKeyBytes = rigo.Bytes.fromHex(
    "c2d20c9d740ef5d511443cc4c00f53e78041f2099f8691869c10a9205ee5692a"
  );
  acct = rigo.Account.Import("validator1", "", prvKeyBytes);
  console.log("mediator : ", acct);

  prvKeyBytes = rigo.Bytes.fromHex(
    "589d73e70c6362c70fd12e04483e2e6c42af99b0f3aec9c994f1fbaed108054c"
  );
  acct = rigo.Account.Import("validator2", "", prvKeyBytes);
  console.log("mediator : ", acct);

  prvKeyBytes = rigo.Bytes.fromHex(
    "13ba6e1e8480ba55046d2abec3a58bbe81e6e54df2f4e11be2b2ac838625eb50"
  );
  acct = rigo.Account.Import("user", "", prvKeyBytes);
  console.log("user : ", acct);

  prvKeyBytes = rigo.Bytes.fromHex(
    "892a25db51978297045ade8e6795d6cd819f4dd6a67bb25a6a8e75205a730a6c"
  );
  acct = rigo.Account.Import("admin", "", prvKeyBytes);
  console.log("admin : ", acct);

  // prvKeyBytes = rigo.Bytes.fromHex(
  //   "380811e53006fc22dee445ce66ef6e28baa990520731d541523605aec5b8ac02"
  // );
  // acct = rigo.Account.Import("jarry", "", prvKeyBytes);

  await rweb3.syncAccount(acct);
  console.log(acct);

  const total = ethers.parseEther("10000000000");

  let jsonInterface;
  let abi;
  let bytecode;
  let contract;
  let contractAddr;
  let result;
  let save;
  let jsonString;

  // // token
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/Token.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);
  // result = await contract.deploy(acct, bytecode, ["medium", "MED", total]);
  // console.log(result);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "token",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/Token.contract.json", jsonString);

  // // addressInfo
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/AddressInfo.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);
  // result = await contract.deploy(acct, bytecode, []);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "addressInfo",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/AddressInfo.contract.json", jsonString);

  // // validation
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/Validation.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);
  // const addressInfo = fs.readFileSync(
  //   `./config/AddressInfo.contract.json`,
  //   "utf-8"
  // );
  // const parsedAddressInfo = JSON.parse(addressInfo);
  // result = await contract.deploy(acct, bytecode, [
  //   parsedAddressInfo.contractAddress,
  // ]);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "validation",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/Validation.contract.json", jsonString);

  // // vault
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/Vault.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);
  // const validation = fs.readFileSync(
  //   `./config/Validation.contract.json`,
  //   "utf-8"
  // );
  // const parsedValidation = JSON.parse(validation);
  // result = await contract.deploy(acct, bytecode, [
  //   parsedValidation.contractAddress,
  // ]);
  // console.log("result :", result);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "vault",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/Vault.contract.json", jsonString);

  // // chaincodeMatchingInfo
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/ChaincodeMatchingInfo.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);
  // contract.gas = "10000000000000000";

  // result = await contract.deploy(acct, bytecode, [
  //   "ChaincodeMatchingInfo",
  //   "v1",
  // ]);
  // console.log("result :", result);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "chaincodeMatchingInfo",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile(
  //   "config/ChaincodeMatchingInfo.contract.json",
  //   jsonString
  // );

  // // vault2
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/Vault2.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);
  // const validation = fs.readFileSync(
  //   `./config/Validation.contract.json`,
  //   "utf-8"
  // );
  // const parsedValidation = JSON.parse(validation);
  // result = await contract.deploy(acct, bytecode, [
  //   parsedValidation.contractAddress,
  // ]);
  // await setTimeout(10000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "vault2",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/Vault2.contract.json", jsonString);

  // // string
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/String.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);

  // result = await contract.deploy(acct, bytecode, []);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "string",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/String.contract.json", jsonString);

  // // type
  // jsonInterface = JSON.parse(fs.readFileSync("./artifacts/Type.json", "utf-8"));
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);

  // result = await contract.deploy(acct, bytecode, []);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "type",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/Type.contract.json", jsonString);

  // // address
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/Address.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);

  // result = await contract.deploy(acct, bytecode, []);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "address",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/Address.contract.json", jsonString);

  // // output
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/Output.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);

  // result = await contract.deploy(acct, bytecode, []);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "output",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/Output.contract.json", jsonString);

  // // curve
  // jsonInterface = JSON.parse(
  //   fs.readFileSync("./artifacts/Secp256k1.json", "utf-8")
  // );
  // abi = jsonInterface.abi;
  // bytecode = jsonInterface.bytecode;
  // contract = rweb3.createContract(abi);

  // result = await contract.deploy(acct, bytecode, []);
  // await setTimeout(5000);
  // contractAddr = await contract.getContractAddress(result.hash);
  // save = {
  //   deployer: acct.address,
  //   contract: "secp256k1",
  //   contractAddress: contractAddr,
  //   txHash: result.hash,
  // };
  // jsonString = JSON.stringify(save);
  // await fs.promises.writeFile("config/Secp256k1.contract.json", jsonString);

  // recover
  jsonInterface = JSON.parse(
    fs.readFileSync("./artifacts/Recover.json", "utf-8")
  );
  abi = jsonInterface.abi;
  bytecode = jsonInterface.bytecode;
  contract = rweb3.createContract(abi);
  contract.gas = "10000000000000000";

  result = await contract.deploy(acct, bytecode, []);
  console.log(result);
  await setTimeout(5000);
  contractAddr = await contract.getContractAddress(result.hash);

  save = {
    deployer: acct.address,
    contract: "recover",
    contractAddress: contractAddr,
    txHash: result.hash,
  };
  jsonString = JSON.stringify(save);
  await fs.promises.writeFile("config/Recover.contract.json", jsonString);
}

async function query() {
  const prvKeyBytes = rigo.Bytes.fromHex(
    "892a25db51978297045ade8e6795d6cd819f4dd6a67bb25a6a8e75205a730a6c"
  );
  const account = rigo.Account.Import("admin", "", prvKeyBytes);
  rweb3.syncAccount(account);

  const jsonInterface = JSON.parse(
    fs.readFileSync("./artifacts/Token.json", "utf-8")
  );
  const abi = jsonInterface.abi;
  const config = JSON.parse(
    fs.readFileSync("./config/Token.contract.json", "utf-8")
  );
  const contractAddress = config.contractAddress;
  const contract = rweb3.createContract(abi, contractAddress);
  const values = ["0b8968272e3433ed45bd6e08ada6e814e3372ebe"];

  const result = await contract.query(account, "balanceOf", values);
  console.log(result);
}

async function web() {
  let result;
  const jsonInterface = JSON.parse(
    fs.readFileSync("./artifacts/Vault.json", "utf-8")
  );
  const abi = jsonInterface.abi;

  // console.log(abi);
  result = web3.eth.abi.decodeParameters(
    abi[1].inputs,
    "00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000344c56e8322d26a07b2b576789359565fa5d09d7000000000000000000000000a33fd9a5ccca1f110ac65e0cf3e3c9f237f1c5c10000000000000000000000000000000000000000000000000000000000000120000000000000000000000000344c56e8322d26a07b2b576789359565fa5d09d70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d02ab486cedc00000000000000000000000000000000000000000000000000000000000000000003455448000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034d444c0000000000000000000000000000000000000000000000000000000000"
  );
  console.log(result);

  const test = new ethers.AbiCoder();
  result = test.encode(
    ["address"],
    ["0x344c56E8322D26a07b2B576789359565fA5D09D7"]
  );
  console.log(result);
}

async function testEx() {
  let result;

  prvKeyBytes = rigo.Bytes.fromHex(
    "10df281fd606f95c6385331379ceb79b3cb9eab3987e1cd18e6b3ff8036853c1"
  );
  acct = rigo.Account.Import("mediator1", "", prvKeyBytes);
  console.log("mediator : ", acct);

  const jsonInterface = JSON.parse(
    fs.readFileSync("./artifacts/Vault.json", "utf-8")
  );
  const abi = jsonInterface.abi;
  const config = JSON.parse(
    fs.readFileSync("./config/Vault.contract.json", "utf-8")
  );
  const contractAddress = config.contractAddress;
  const contract = rweb3.createContract(abi, contractAddress);
  const amount = ethers.parseEther("10");
  // const arr = ethers.toBeArray();
  const values = [
    "0xec35e476c36937bc20b821be12edc1b82989a3df8874b31f59a5a06400c6c4a8",
    "0b8968272e3433ed45bd6e08ada6e814e3372ebe",
    "0b8968272e3433ed45bd6e08ada6e814e3372ebe",
    "0b8968272e3433ed45bd6e08ada6e814e3372ebe",
    amount,
  ];

  // [
  //   {
  //     v: 28,
  //     r: "0xec35e476c36937bc20b821be12edc1b82989a3df8874b31f59a5a06400c6c4a8",
  //     s: "0x07965e4673b44d14368c0f28c90397ffdfec9b388eeced5e58dacc2361e875a9",
  //   },
  // ],

  // abi[1].inputs,
  // "00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000344c56e8322d26a07b2b576789359565fa5d09d7000000000000000000000000a33fd9a5ccca1f110ac65e0cf3e3c9f237f1c5c10000000000000000000000000000000000000000000000000000000000000120000000000000000000000000344c56e8322d26a07b2b576789359565fa5d09d70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d02ab486cedc00000000000000000000000000000000000000000000000000000000000000000003455448000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034d444c0000000000000000000000000000000000000000000000000000000000"
  // console.log(abi);

  // result = web3.eth.abi.encodeParameters(
  //   [
  //     {
  //       internalType: "int256[]",
  //       name: "arr",
  //       type: "int256[]",
  //     },
  //   ],
  //   [2, 3]
  // );

  result = web3.eth.abi.encodeParameter(
    {
      components: [
        {
          internalType: "address",
          name: "name",
          type: "address",
        },
        {
          internalType: "string",
          name: "nick",
          type: "string",
        },
      ],
      internalType: "struct Type.a",
      name: "arr",
      type: "tuple",
    },
    {
      name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab",
      nick: "test",
    }
  );
  console.log(result);

  // result = web3.eth.abi.encodeParameter("tuple", {
  //   name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab",
  //   nick: "test",
  // });
  // console.log(result);

  // result = web3.eth.abi.encodeParameters(
  //   [
  //     {
  //       components: [
  //         {
  //           internalType: "address",
  //           name: "name",
  //           type: "address",
  //         },
  //         {
  //           internalType: "string",
  //           name: "nick",
  //           type: "string",
  //         },
  //       ],
  //       internalType: "struct Type.a",
  //       name: "arr",
  //       type: "tupl123123e",
  //     },
  //     {
  //       components: [
  //         {
  //           internalType: "addr1ess",
  //           name: "name",
  //           type: "address",
  //         },
  //         {
  //           internalType: "string",
  //           name: "nick",
  //           type: "string",
  //         },
  //       ],
  //       internalType: "stru12ct Type.a",
  //       name: "arr3",
  //       type: "tup123le2",
  //     },
  //   ],
  //   [
  //     {
  //       name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab",
  //       nick: "test",
  //     },
  //     {
  //       name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab",
  //       nick: "test",
  //     },
  //   ]
  // );

  // result = web3.eth.abi.encodeParameter(
  //   {
  //     components: [
  //       {
  //         internalType: "address",
  //         name: "name",
  //         type: "address",
  //       },
  //       {
  //         internalType: "string",
  //         name: "nick",
  //         type: "string",
  //       },
  //     ],
  //     internalType: "struct Type.a[]",
  //     name: "arr",
  //     type: "tuple[]",
  //   },
  //   [
  //     {
  //       name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab",
  //       nick: "test",
  //     },
  //     {
  //       name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab",
  //       nick: "test",
  //     },
  //   ]
  // );

  // result = web3.eth.abi.encodeParameter(
  //   {
  //     components: [
  //       {
  //         internalType: "uint8",
  //         name: "v",
  //         type: "uint8",
  //       },
  //       {
  //         internalType: "bytes32",
  //         name: "r",
  //         type: "bytes32",
  //       },
  //       {
  //         internalType: "bytes32",
  //         name: "s",
  //         type: "bytes32",
  //       },
  //     ],
  //     internalType: "struct IValidation.Signature[]",
  //     name: "multiSig",
  //     type: "tuple[]",
  //   },
  //   [
  //     {
  //       v: 28,
  //       r: "0xec35e476c36937bc20b821be12edc1b82989a3df8874b31f59a5a06400c6c4a8",
  //       s: "0x07965e4673b44d14368c0f28c90397ffdfec9b388eeced5e58dacc2361e875a9",
  //     },
  //   ]
  // );

  // result = web3.eth.abi.encodeParameters(
  //   [
  //     {
  //       components: [
  //         {
  //           internalType: "address",
  //           name: "name",
  //           type: "address",
  //         },
  //         {
  //           internalType: "string",
  //           name: "nick",
  //           type: "string",
  //         },
  //       ],
  //       internalType: "struct Type.a[]",
  //       name: "arr",
  //       type: "tuple[]",
  //     },
  //     {
  //       components: [
  //         {
  //           internalType: "address",
  //           name: "name",
  //           type: "address",
  //         },
  //         {
  //           internalType: "string",
  //           name: "nick",
  //           type: "string",
  //         },
  //       ],
  //       internalType: "struct Type.a[]",
  //       name: "arr2",
  //       type: "tuple[]",
  //     },
  //   ],
  //   [
  //     [
  //       {
  //         name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab",
  //         nick: "test",
  //       },
  //     ],
  //     [
  //       {
  //         name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab",
  //         nick: "test",
  //       },
  //     ],
  //   ]
  // );

  // const result = await contract.execute(acct, "unlock", values);
  // console.log(result);
}

async function type() {
  let result;

  const prvKeyBytes = rigo.Bytes.fromHex(
    "892a25db51978297045ade8e6795d6cd819f4dd6a67bb25a6a8e75205a730a6c"
  );
  const account = rigo.Account.Import("admin", "", prvKeyBytes);
  rweb3.syncAccount(account);

  const jsonInterface = JSON.parse(
    fs.readFileSync("./artifacts/Type.json", "utf-8")
  );
  const abi = jsonInterface.abi;
  const config = JSON.parse(
    fs.readFileSync("./config/Type.contract.json", "utf-8")
  );
  const contractAddress = config.contractAddress;
  const contract = rweb3.createContract(abi, contractAddress);

  // result = await contract.query(account, "A", [[1, 2]]);
  // console.log(result);

  result = await contract.execute(account, "B", [
    { name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab", nick: "kyle" },
  ]);
  console.log(result);

  // result = await contract.query(account, "C", [
  //   [{ name: "0x7b26b5a788b7f66f8958a154a41b8c3e613710ab", nick: "kyle" }],
  // ]);
  // console.log(result);
}

async function execute() {
  let result;
  let jsonInterface, abi, config, contractAddress, contract;

  // prvKeyBytes = rigo.Bytes.fromHex(
  //   "380811e53006fc22dee445ce66ef6e28baa990520731d541523605aec5b8ac02"
  // );
  // acct = rigo.Account.Import("jarry", "", prvKeyBytes);
  prvKeyBytes = rigo.Bytes.fromHex(
    "c2d20c9d740ef5d511443cc4c00f53e78041f2099f8691869c10a9205ee5692a"
  );
  acct = rigo.Account.Import("validator1", "", prvKeyBytes);

  await rweb3.syncAccount(acct);
  console.log(acct);

  jsonInterface = JSON.parse(
    fs.readFileSync("./artifacts/Recover.json", "utf-8")
  );
  abi = jsonInterface.abi;
  config = JSON.parse(
    fs.readFileSync("./config/Recover.contract.json", "utf-8")
  );
  contractAddress = config.contractAddress;
  contract = rweb3.createContract(abi, contractAddress);

  result = await contract.execute(acct, "recoverAddress", [
    "0xfb4209b1f03f3ed382949ba091fcbba93ab140978712d47e48a7f3ebb60eed19",
    "0x1",
    "0x9ae1040ad2e020adf98d1839a33fa75aeedaacb0e4bd70b09e5e86e25fafd1fd",
    "0x69ff7158b9430de5b6923cc724f29902e09c511b9dc72759f1622cd6afe94474",
  ]);
  console.log(result);

  await setTimeout(5000);

  result = await contract.query(acct, "getAddr", []);
  console.log(result);

  const decode = web3.eth.abi.decodeParameter(
    {
      internalType: "address",
      name: "",
      type: "address",
    },
    result.value.returnData
  );
  console.log(decode);

  result = await contract.query(acct, "check", []);
  console.log(result);

  // const tx = await rweb3.queryTrx(result.hash);
  // console.log(tx);

  // const qq =
  //   "CAEQgLb24pfbwLwXGAwiFPQ9ZEY0FXqQUChP8t6VsYoTdhsOKhQsdUG0EJBIfgjijsjwxTSMqI0F/zoHA41+pMaAAEAGSocBCoQBhCjPg2LZucDOFP2GzlX97agQ1XtukgHvQomxmfpZ2Rf5ME0rAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF3oXTIqQYEjLA4fMARYJRaK5YrEMfmn40HKR9vi5oiTlc36p+qLzOIG97BH1gg/WnfAALW1Hl6B+dTFebailieUkHCulP0R8B5hWxF1SIfFSIiK7+j6SOmlYnCDZEtV2K9+mBDb53WjqrI5nwtrXoi543fHH2HbcemY1blUMGhJYRCAQ==";
  // const aaa = await rigo.TrxBuilder.DecodeTrx(Bytes.b64ToBytes(qq));
  // console.log(aaa);
}

async function bridge() {
  // contractAddr = await contract.getContractAddress(
  //   "1918BC7B10112A60AAB5CD38A27A0C2612A0598DC8A29835C988A96720742B07"
  // );
  // console.log(contractAddr);

  const tx = await rweb3.queryTrx(
    "6568284367EBABBA67CBF75A4A53CCBAB515B7F1686327C8F77EB75A7B7C8B3A"
  );
  console.log(tx);
}

async function main() {
  // deploy();
  // query();
  // web();
  // testEx();
  // type();
  // bridge();
  execute();
}

main();
