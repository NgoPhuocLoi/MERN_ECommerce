const jwt = require("jsonwebtoken");
const generateTokensPair = (payload, privateKey, publicKey) => {
  const accessToken = jwt.sign(payload, publicKey, { expiresIn: "3d" });
  const refreshToken = jwt.sign(payload, privateKey, { expiresIn: "7d" });
  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  generateTokensPair,
};
