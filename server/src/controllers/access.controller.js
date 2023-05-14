const AccessService = require("../services/access.service");

class AccessController {
  static async register(req, res, next) {
    const metadata = await AccessService.register(req.body);
    res.status(201).json({
      status: "success",
      metadata,
    });
  }
}

module.exports = AccessController;
