import jwt from "jsonwebtoken";

export const sign = async (payload: any, privateKey, expiresIn) => {
  const token = await jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: `${expiresIn} days`,
  });
  return token;
};

export const verify = (token: string, publicKey: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded,
      message: null,
    };
  } catch (error) {
    console.log("token", token, { error });
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = error;
    }
    return {
      valid: false,
      expired: message === "jwt expired",
      message,
      decoded: null,
    };
  }
};
