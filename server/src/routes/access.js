const AccessController = require("../controllers/access.controller");
const { asyncHandler } = require("../utils/asyncHandler");
const router = require("express").Router();

router.post("/register", asyncHandler(AccessController.register));
router.post("/login", asyncHandler(AccessController.login));

module.exports = router;
