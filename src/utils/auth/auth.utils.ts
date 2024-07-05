import { sign } from "../../utils/jwt";

const TOKEN_EXPIRESIN = {
  accessToken: 2,
  refreshToken: 7,
};

const HEADERS = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
};
export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await sign(
      payload,
      privateKey,
      TOKEN_EXPIRESIN.accessToken,
    );

    const refreshToken = await sign(
      payload,
      privateKey,
      TOKEN_EXPIRESIN.refreshToken,
    );

    // JWT.verify(accessToken, publicKey, (error, decode) => {
    //   if (error) {
    //     console.log("=====> verify error", error);
    //   } else {
    //     console.log("=====> verify: ", decode);
    //   }
    // });
    return { accessToken, refreshToken };
  } catch (error) {}
};
