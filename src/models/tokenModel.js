const crypto = require("crypto");

const tokenPlayload = {
  userId: user._id.toString(),
  role: "user",
  issueAt: Date.now(),
  expiresIn: Date.now() + 900 * 1000,
  nonce: 0,
  proofOfWrok: "",
  issuer: "authserver",
  deviceFingerprint: generateDeviceFingerprint(req),
};

module.exports = { tokenPlayload };
