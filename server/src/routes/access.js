const AccessController = require("../controllers/access.controller");
const { asyncHandler } = require("../utils/asyncHandler");
const router = require("express").Router();

router.post("/register", asyncHandler(AccessController.register));

module.exports = router;
