import JWT from "jsonwebtoken";

export const createTokenPair = async (payload, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
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
