const router = require("express").Router();

router.use("/user", require("./access"));
router.use("/user", require("./user"));

module.exports = router;
