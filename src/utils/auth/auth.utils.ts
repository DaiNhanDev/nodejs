import { sign } from "../../utils/jwt";

const TOKEN_EXPIRESIN = {
  accessToken: 2,
  refreshToken: 7,
};

export const createTokenPair = async (payload, privateKey) => {
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

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("====> error", error);
  }
};
