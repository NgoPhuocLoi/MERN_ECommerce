const AccessService = require("../services/access.service");
const { CreatedResponse, OKResponse } = require("../helpers/success.response");
const { BadRequestError } = require("../helpers/error.response");

const HEADER = {
  AUTHORIZATION: "authorization",
  USER_ID: "x-client-id",
  REFRESH_TOKEN: "x-rtoken",
};
class AccessController {
  static async handleRefreshToken(req, res, next) {
    const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
    const userId = req.headers[HEADER.USER_ID];
    if (!refreshToken || !userId) throw new BadRequestError("Invalid Request!");
    new OKResponse({
      message: "New tokens were created!",
      metadata: await AccessService.handleRefreshToken({
        refreshToken,
        userId,
      }),
    }).send(res);
  }
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
