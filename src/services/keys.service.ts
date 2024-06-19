import { keyRepository } from "../repositories";

class KeyTokenService {
  static createKeyToken({ userId, publicKey }) {
    return new Promise(async (resolve, reject) => {
      try {
        const publicKeyString = publicKey.toString();
        const tokens = await keyRepository.createKeyToken({
          userId,
          publicKey: publicKeyString,
        });
        console.log("====> tokens", tokens);
        return resolve(tokens ? tokens.publicKey : null);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

export { KeyTokenService };
