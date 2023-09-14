import * as rigo from "rigo-sdk-js";
import * as mdl from "mdl-sdk-node";
import * as fs from "fs";

const rweb3 = new rigo.RWeb3("https://rpc1.testnet.rigochain.io");

let prvKeyBytes;
let acct;

const privateKey = [
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

async function main() {
  let i = 1;
  let arr = [];

  for (const value of privateKey) {
    await fs.promises.writeFile("pem.key", value);

    const a = await mdl.newContract("rigo");
    const pub = a.publicKey("pem.key");
    console.log("public : ", pub);
    const hash = a.hash("a");
    if (typeof hash == "string") {
      const sig = a.sign(hash, "pem.key");
      const addr = await mdl.newAddress("rigo", pub, hash, sig);
      const ad = await a.address(addr);
      console.log(ad);

      const obj = {
        name: `user${i}`,
        publicKey: pub,
        privateKey: value,
        address: "0x" + ad,
      };
      i++;
      arr.push(obj);
    }
    await fs.promises.unlink("pem.key");

    prvKeyBytes = rigo.Bytes.fromHex(value);
    acct = rigo.Account.Import("user", "", prvKeyBytes);
    await rweb3.syncAccount(acct);
    console.log("user : ", acct);
  }
  console.log(arr);
  await fs.promises.writeFile("address.json", JSON.stringify(arr));
}

main();
