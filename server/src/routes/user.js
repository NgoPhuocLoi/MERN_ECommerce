const UserController = require("../controllers/user.controller");
const { authentication } = require("../middlewares/auth");
const { asyncHandler } = require("../utils/asyncHandler");

const router = require("express").Router();

router.use(authentication);
router.get("/", asyncHandler(UserController.getCurrentUser));

module.exports = router;
