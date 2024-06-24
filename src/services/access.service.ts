import { createTokenPair, encryptSync, getInfoData } from "../utils";
import { compare } from "bcrypt";
import { shopRepository } from "../repositories";
import { KeyTokenService } from "./keys.service";
import {
  BadRequestError,
  ConflictRequestError,
  AuthError,
} from "../utils/error.response";
import { generateKeyPair } from "../utils/crypto";

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

      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey
      });

      if (!publicKeyString) {
        return {
          code: "xxxx",
          message: "publicKeyString error!",
        };
      }
      const { accessToken, refreshToken } = await createTokenPair(
        { userId: newShop._id, email },
        privateKey
      );

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

  static async login({ email, passowrd, refreshToken = null }) {
    const foundShop = await shopRepository.findByEmail(email);
    if (!foundShop) throw new BadRequestError("Shop not registered");

    const match = compare(passowrd, foundShop.password);
    if (!match) throw new AuthError();

    const { publicKey, privateKey } = await generateKeyPair();

    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      publicKey,
      privateKey
    });

    if (!publicKeyString) {
      return {
        code: "xxxx",
        message: "publicKeyString error!",
      };
    }

    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      privateKey
    );
    return {
      shop: getInfoData(["_id", "name", "email"], foundShop),
      tokens,
    };
  }
}

export { AccessService };
