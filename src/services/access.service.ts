import { createTokenPair, encryptSync, getInfoData } from "../utils";
import { generateKeyPairSync } from "crypto";
import { shopRepository } from "../repositories";
import { KeyTokenService } from "./keys.service";

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

      const newShop = await shopRepository.createShop({
        email,
        name,
        password: passwordHash,
        status: "inactive",
        verify: false,
        roles: ["ADMIN"],
      });

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

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString error!",
          };
        }
        const { accessToken, refreshToken } = await createTokenPair(
          { userId: newShop._id, email },
          privateKey,
        );

        return {
          code: 201,
          metadata: {
            shop: getInfoData(["_id", "name", "email"], newShop),
            tokens: {
              accessToken,
              refreshToken,
            },
          },
        };
      }
      return {
        code: "xxxx",
        message: "Shop already registered!",
      };
    } catch (error) {}
  }
}

export { AccessService };
