const KeyToken = require("../models/keytoken");
class KeyTokenService {
  static async createKeyToken({ userId, privateKey, publicKey, refreshToken }) {
    const keyToken = await KeyToken.findOneAndUpdate(
      { user: userId },
      {
        privateKey,
        publicKey,
        refreshToken,
      },
      {
        upsert: true,
        new: true,
      }
    );
    console.log({ keyToken });
    return keyToken;
  }

  static async findByUserId(userId) {
    return await KeyToken.findOne({ user: userId }).lean();
  }
}

module.exports = KeyTokenService;
