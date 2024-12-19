const crypto = require('crypto')
//const { user } = require('../controllers/userController')
const { generateDeviceFingerprint } = require('../utils/securityUtils')
const { ObjectId } = require('mongodb')

async function generateToken(req, user) {
  const tokenPayload = {
    userId: user._id.toString(),
    role: 'user',
    issueAt: Date.now(),
    expiresIn: Date.now() + 900 * 1000, // 15 minutes
    nonce: 0,
    proofOfWork: '',
    issuer: 'authserver',
    deviceFingerprint: generateDeviceFingerprint(req),
  }
  return tokenPayload
}

module.exports = { generateToken }
