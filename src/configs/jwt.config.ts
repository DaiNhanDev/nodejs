export const jwtConfig = {
  secret: process.env.SECRET || "askjfghhwifuhgw",
  expiry: process.env.TOKEN_EXPIRY_HOUR || 168,
  saltRound: 10,
};
