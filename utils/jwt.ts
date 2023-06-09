const JWT = require("jsonwebtoken");
require("dotenv").config();

export function createAccessToken(object: object) {
  const token = JWT.sign(
    {
      data: object,
      exp: Math.floor(Date.now() / 1000) + 250 * 60 * 60 * 60 * 24,
    },
    "Ahmad_Raid_Secret_Token_key"
  );
  return token;
}

export function createRefreshToken(object: object) {
  const token = JWT.sign(
    {
      data: object,
      exp: Math.floor(Date.now() / 1000) + 280 * 60 * 60 * 60 * 60 * 24 * 30,
    },
    "Ahmad_Raid_Secret_Refresh_Token_key"
  );
  return token;
}

export function create_Tokens_with_cookie(object: object) {
  return {
    access_Token: createAccessToken(object),
    refresh_token: createRefreshToken(object),
  };
}

export function verifyAccessToken(token: string) {
  return JWT.verify(token, "Ahmad_Raid_Secret_Token_key");
}

export function verifyRefreshToken(token: string) {
  return JWT.verify(token, "Ahmad_Raid_Secret_Refresh_Token_key");
}
