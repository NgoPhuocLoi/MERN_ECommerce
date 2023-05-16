const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserService = require("./user.service");
const User = require("../models/user");

const {
  BadRequestError,
  AuthFailureError,
} = require("../helpers/error.response");
const { generateTokensPair } = require("../utils/auth");
const KeyTokenService = require("./keytoken.service");
class AccessService {
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
