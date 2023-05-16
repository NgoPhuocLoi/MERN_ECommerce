const { AuthFailureError } = require("../helpers/error.response");
const KeyTokenService = require("../services/keytoken.service");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const HEADER = {
  AUTHORIZATION: "authorization",
  USER_ID: "x-client-id",
};

const authentication = asyncHandler(async (req, res, next) => {
  const bearerToken = req.headers[HEADER.AUTHORIZATION];
  const userId = req.headers[HEADER.USER_ID];
  if (!bearerToken || !userId) throw new AuthFailureError("Invalid request!");
  const accessToken = bearerToken.split(" ")[1];

  if (!accessToken) throw new AuthFailureError("Invalid access token");
  const keyToken = await KeyTokenService.findByUserId(userId);
  if (!keyToken) throw new AuthFailureError("User has not been registered");
  try {
    const decoded = await jwt.verify(accessToken, keyToken.publicKey);
    req.user = decoded;
    return next();
  } catch (error) {
    throw new AuthFailureError("Invalid Token");
  }
});

module.exports = {
  authentication,
};
