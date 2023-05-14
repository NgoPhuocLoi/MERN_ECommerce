const router = require("express").Router();

router.use("/user", require("./access"));

module.exports = router;
