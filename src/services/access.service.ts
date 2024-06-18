import { shopModel } from "models";
import { IShop } from "types";

import { encryptSync } from "@src/utils";
import { ROLE_SHOP } from "../constants";
import { generateKeyPairSync } from "crypto";
import { shopRepository } from "../repositories";

class AccessService {
  static async signUp({ email, name, password }) {
    try {
      const shopExist: boolean = await shopRepository.shopExist(email);
      if (shopExist) {
        return {
          code: "xxxx",
          message: "Shop already registered!",
        };
      }
      const passwordHash = encryptSync(password);
      console.log("====> passwordHash", passwordHash);

      const newShop = await shopRepository.createShop({
        email,
        name,
        password: passwordHash,
        status: "inactive",
        verify: false,
        roles: ["ADMIN"],
      });
      // console.log('====> new Shop: ', newShop);

      if (!!newShop) {
        const { publicKey, privateKey } = generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });
        console.log("======> generateKeyPairSync", { publicKey, privateKey });
      }
      return {
        code: "xxxx",
        message: "Shop already registered!",
      };
    } catch (error) {}
  }
}

export { AccessService };
