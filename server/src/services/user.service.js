const User = require("../models/user");
class UserService {
  static async findById(userId) {
    return await User.findById(userId).select("-password -role").lean();
  }

  static async findByEmailOrPhone({ email, mobile }) {
    return await User.findOne({ $or: [{ email }, { mobile }] }).lean();
  }
}

module.exports = UserService;
