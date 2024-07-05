import { createTokenPair, encryptSync, getInfoData } from "../utils";
import { compare } from "bcrypt";
import { keyRepository, shopRepository } from "../repositories";
import { KeyTokenService } from "./keys.service";
import {
  BadRequestError,
  ConflictRequestError,
  AuthError,
  FobidenError,
} from "../utils/error.response";
import { generateKeyPair } from "../utils/crypto";
import { verify } from "../utils/jwt";

class AccessService {
  static async signUp({ email, name, password }) {
    const shopExist: boolean = await shopRepository.shopExist(email);
    if (shopExist) {
      console.log("object");
      throw new ConflictRequestError("Shop already registered!");
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
      const { publicKey, privateKey } = await generateKeyPair();
      const { accessToken, refreshToken } = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );

      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
        refreshToken,
      });

      if (!publicKeyString) {
        return {
          code: "xxxx",
          message: "publicKeyString error!",
        };
      }
      return {
        shop: getInfoData(["_id", "name", "email"], newShop),
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    }
    return {
      code: "xxxx",
      message: "Shop already registered!",
    };
  }
  /**
   *
   */
  static async login({ email, password }) {
    const foundShop = await shopRepository.findShopByEmail(email);
    if (!foundShop) throw new BadRequestError("Shop not registered");

    const match = compare(password, foundShop.password);
    if (!match) throw new AuthError();

    const { publicKey, privateKey } = await generateKeyPair();
    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    );

    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    if (!publicKeyString) {
      return {
        code: "xxxx",
        message: "publicKeyString error!",
      };
    }

    return {
      shop: getInfoData(["_id", "name", "email"], foundShop),
      tokens,
    };
  }

  /**
   *
   */
  static async logout(id) {
    const metadata = keyRepository.removeKeyById(id);
    return metadata;
  }

  /**
   *
   */
  static async handleRefreshToken(refreshToken) {
    const foundToken = await keyRepository.findByRefreshTokenUsed(refreshToken);
    console.log('------> foundToken', foundToken);

    if (!!foundToken) {
      const { decoded } = await verify(refreshToken, foundToken.publicKey);

      await keyRepository.removeKeyById(decoded?.userId);

      throw new FobidenError();
    }

    const holderToken =
      await keyRepository.findByRefreshToken(refreshToken);
    console.log('------> holderToken', holderToken);
    if (!holderToken) throw new AuthError();
    const { decoded } = await verify(refreshToken, holderToken.publicKey);
    console.log('------> decoded', decoded);

    const foundShop = await shopRepository.findShopByEmail(decoded?.email);
    if (!foundShop) throw new AuthError();

    const tokens = await createTokenPair(
      { userId: foundShop._id, email: foundShop.email },
      holderToken.publicKey,
      holderToken.privateKey
    );
    await keyRepository.updateToken({
      refreshToken: tokens.refreshToken,
      refreshTokensUsed: refreshToken
    })
    return {
      shop: getInfoData(["_id", "name", "email"], foundShop),
      tokens,
    };
  }
}

export { AccessService };
