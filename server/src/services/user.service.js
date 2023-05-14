const User = require("../models/user");
class UserService {
  static async findByEmail(email) {
    return await User.findOne({ email }).lean();
  }
}

module.exports = UserService;
