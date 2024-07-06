import { sign } from "../../utils/jwt";

const TOKEN_EXPIRESIN = {
  accessToken: 2,
  refreshToken: 7,
};

export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await sign(
      payload,
      publicKey,
      TOKEN_EXPIRESIN.accessToken,
    );

    const refreshToken = await sign(
      payload,
      publicKey,
      TOKEN_EXPIRESIN.refreshToken,
    );
    return { accessToken, refreshToken };
  } catch (error) {}
};
