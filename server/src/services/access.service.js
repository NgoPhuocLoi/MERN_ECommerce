const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const UserService = require("./user.service");
const User = require("../models/user");
const KeyToken = require("../models/keytoken");

const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../helpers/error.response");
const { generateTokensPair } = require("../utils/auth");
const KeyTokenService = require("./keytoken.service");
class AccessService {
  static async handleRefreshToken({ refreshToken, userId }) {
    const keyToken = await KeyTokenService.findByUserId(userId);

    if (!keyToken) throw new BadRequestError("User is not registered!");
    if (refreshToken !== keyToken.refreshToken)
      throw new AuthFailureError("Invalid refresh token!");
    try {
      const decoded = jwt.verify(refreshToken, keyToken.privateKey);

      const tokens = generateTokensPair(
        { userId: decoded.userId, role: decoded.role },
        keyToken.privateKey,
        keyToken.publicKey
      );

      await KeyToken.findByIdAndUpdate(keyToken._id, {
        $set: {
          refreshToken: tokens.refreshToken,
        },
      });

      return {
        tokens,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenError("Something went wrong! Please login again!");
    }
  }
  static async login({ email, password }) {
    const user = await UserService.findByEmailOrPhone({ email });

    if (!user) throw new AuthFailureError("Invalid email or password! (1)");

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword)
      throw new AuthFailureError("Invalid email or password! (2)");

    // generate tokens
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    const tokens = generateTokensPair(
      { userId: user._id, role: user.role },
      privateKey,
      publicKey
    );
    await KeyTokenService.createKeyToken({
      userId: user._id,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    const { password: p, role, ...userInfo } = user;
    return {
      tokens,
      user: userInfo,
    };
  }

  static async register({ email, password, firstName, lastName, mobile }) {
    const holderUser = await UserService.findByEmailOrPhone({ email, mobile });

    if (holderUser) {
      const errMsg =
        holderUser.email === email
          ? "Email has already been used!"
          : "Phone has already been used!";
      throw new BadRequestError(errMsg);
    }

    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      mobile,
    });

    return {
      user: newUser,
    };
  }
}

module.exports = AccessService;
