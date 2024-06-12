import { keyTokenModel } from "models/keytoken.model";

class KeyTokenService {
  static createKeyToken({ userId, publicKey }) {
    return new Promise(async (resolve, reject) => {
      try {
        const publicKeyString = publicKey.toString();
        const tokens = await keyTokenModel.create({
          user: userId,
          publicKey: publicKeyString,
        });
        resolve(tokens ? publicKeyString : null);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export { KeyTokenService };
