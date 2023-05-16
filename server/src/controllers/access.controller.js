const AccessService = require("../services/access.service");
const { CreatedResponse, OKResponse } = require("../helpers/success.response");
class AccessController {
  static async login(req, res, next) {
    new OKResponse({
      message: "Login successfully!",
      metadata: await AccessService.login(req.body),
    }).send(res);
  }

  static async register(req, res, next) {
    new CreatedResponse({
      message: "Register successfully",
      metadata: await AccessService.register(req.body),
    }).send(res);
  }
}

module.exports = AccessController;
