import { shopModel } from "models/shop.model";
import { encryptSync } from "utils/encrypt";
import { ROLE_SHOP } from "../constants";
import { generateKeyPairSync } from "crypto";

class AccessService {
  static signUp({ email, name, password }) {
    return new Promise(async (resolve, reject) => {
      const findEmail = await shopModel.findOne({ email }).lean();
      if (!!findEmail) {
        return resolve({
          code: "xxxx",
          message: "Shop already registered!",
        });
      }
      const passwordHash = encryptSync(password);

      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [ROLE_SHOP.SHOP],
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
        console.log('======> generateKeyPairSync', {publicKey, privateKey})
      }
    });
  }
}

export { AccessService };
