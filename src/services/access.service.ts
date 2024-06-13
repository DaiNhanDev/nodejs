import { shopModel } from "models";
import { encryptSync } from "utils/encrypt";
import { ROLE_SHOP } from "../constants";
import { generateKeyPairSync } from "crypto";
import { shopRepository } from "repositories";


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
      const newShop = shopRepository.createShop({
        email,
        name,
        password: passwordHash,
        status: "inactive",
        verify: false,
        roles: [],
      })
      // const newShop = await shopModel.create({
      //   name,
      //   email,
      //   password: passwordHash,
      //   roles: [ROLE_SHOP.SHOP],
      // });

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
    } catch (error) {
      
    }
  }
}

export { AccessService };
