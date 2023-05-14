const UserService = require("./user.service");
const User = require("../models/user");
class AccessService {
  static async register({ email, password, firstName, lastName, mobile }) {
    const holderUser = await UserService.findByEmail(email);

    if (holderUser) {
      const err = new Error("Email has already been used!");
      err.statusCode = 400;
      throw err;
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
