const crypto = require("crypto");
const tokenPlayload = require("../models/tokenModel");
const { generateDeviceFingerprint } = require("./securityUtils");

const { nonce, proofOfWrok } = generateNonce(tokenPlayload);
tokenPlayload.nonce = nonce;
tokenPlayload.proofOfWrok = proofOfWrok;

// proofOfWork : toutes les informations de Token concaténés + hashé + nonce

function generateNonce(infos, difficulty = 3) {
  let nonce = 0;
  const targetPrefix = "0".repeat(difficulty);

  while (true) {
    const dataToHash = `${JSON.stringify(infos)}${nonce}`;
    const hash = sha56(dataToHash);

    if (hash.startsWith(targetPrefix)) {
      return { nonce, proofOfWork: hash };
    }
    nonce++;
  }
}

async function verifyNonce() {}

async function generateToken(req, user, tokenModel) {
  let deviceFingerprint = generateDeviceFingerprint(req);
  tokenPlayload.userId = user._id;
  let deviceAndToken = deviceFingerprint + tokenPlayload.userId;

  return { deviceFingerprint };
}

async function verifyToken(tokenId, req) {}

// vérifier le nonce
// vérifier le token
module.exports = { generateNonce, generateToken, verifyToken };
