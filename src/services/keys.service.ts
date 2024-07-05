import { keyRepository } from "../repositories";

class KeyTokenService {
  static createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    return new Promise(async (resolve, reject) => {
      try {
        const publicKeyString = publicKey.toString();
        const tokens = await keyRepository.findOneAndUpdate({
          userId,
          publicKey: publicKeyString,
          refreshTokensUsed: [],
          refreshToken,
          privateKey,
        });
        return resolve(tokens ? tokens.publicKey : null);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

export { KeyTokenService };
