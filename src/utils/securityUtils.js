const crypto = require("crypto");

function generateDeviceFingerprint(req) {
  // navigateur + ip + fuseau  horaire => hashé
  const userAgent = req.headers["user-agent"] || "";
  const ip = req.ip || "";
  const timezone = req.headers["timezone"] || "";
  const fingerprintData = `${userAgent}-${ip}-${timezone}`;
  return crypto.createHash("sha256").update(fingerprintData).digest("hex");
}

module.exports = { generateDeviceFingerprint };
