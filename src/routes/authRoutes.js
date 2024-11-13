const express = require("express");
const router = express.Router();
const tokenPlayload = require("../utils/token.utils");

router.post("/tokenPlayload", tokenPlayload.generateDeviceFingerprint(req));

module.exports = router;