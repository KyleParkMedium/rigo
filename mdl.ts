import * as mdl from "mdl-sdk-node";
import {
  ecdsaSign,
  ecdsaVerify,
  publicKeyConvert,
  publicKeyCreate,
} from "secp256k1";
import * as elliptic from "elliptic";
import {
  addHexPrefix,
  ecsign,
  toBuffer,
  setLengthLeft,
  bufferToHex,
  ecrecover,
  toChecksumAddress,
  publicToAddress,
  ripemd160,
  sha256,
  toUtf8,
} from "ethereumjs-util";
import { createHash } from "crypto";

async function main() {
  //   const contract = await mdl.newContract(mdl.RIGO);
  const contract = await mdl.newContract(mdl.RIGO);

  const test = publicKeyCreate(
    toBuffer(
      "0x589d73e70c6362c70fd12e04483e2e6c42af99b0f3aec9c994f1fbaed108054c"
    )
  );
  console.log(bufferToHex(Buffer.from(test)));

  //   0x032542e5e2c816ee4d0e0459559e57951cbeedd3ec5b22a8cc3fed1065fcb76ea0

  const EC = new elliptic.ec("secp256k1");

  const a = EC.keyFromPrivate(
    "c2d20c9d740ef5d511443cc4c00f53e78041f2099f8691869c10a9205ee5692a"
  );
  const pu = a.getPublic();
  console.log(pu.encode("hex", false));
  console.log(pu.encode("hex", true));
  console.log(a.getPublic(true, "array"));

  const v = ecdsaVerify(
    toBuffer(
      "0xbfa24da26a4e12a1397a27538ca52a37015307547d9c4a903f47d56ee8f3b28652a851c8561b92917bd68f63585edc0cddfba9b569a6f88f76ec999dc21d4733"
    ),
    toBuffer(
      "0x85e7823e95642ee26672cf17f3dd81f8a1484c18ba5a41ab71a3e00a7b516de7"
    ),
    toBuffer(
      "0x0262b04f0d5edbefc0d21de591974b1b58d0dcd5a8d91538e5128c2202610a9009"
    )
  );
  console.log(v);

  const test1 = "test";
  // test1.randomBytes(32);
  const s = ecdsaSign(
    toBuffer(
      "0x1cb9c43f94df0eb816d33c5f426e8d10263f37bbfc41ddfbcaa5bf45467a2c91"
    ),
    toBuffer(
      "0xc2d20c9d740ef5d511443cc4c0f53e78041f2099f8691869c10a9205ee5692a"
    ),
    {},
    Buffer.alloc
  );
  console.log(bufferToHex(Buffer.from(s.signature)));

  console.log(s);

  // update(data: BinaryLike): Hash;
  const sha256 = createHash("sha256");
  const hmsg = sha256
    .update(
      toBuffer(
        "0x0438b02f920b479b21b0af581ae38e9f3e4dfab5b6e1ec9262292a5a3cd3cd0a"
      )
    )
    .digest();
  console.log(bufferToHex(hmsg));

  // mdl-sdk-go
  func (r *RigoContract) Hash(data string) (string, error) {
    return hexutil.Encode(crypto.Sha256([]byte(data))), nil
  }
  
  console.log(
    contract.hash(
      "0x0438b02f920b479b21b0af581ae38e9f3e4dfab5b6e1ec9262292a5a3cd3cd0a"
    )
  );
}

main();


