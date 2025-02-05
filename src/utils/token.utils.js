//const crypto = require('crypto')
const { sha256 } = require('js-sha256')
const { generateDeviceFingerprint } = require('./securityUtils')
const UserModel = require('../models/userModel')

function generateNonce(infos, difficulty = 3) {
  let nonce = 0
  const targetPrefix = '0'.repeat(difficulty)

  while (true) {
    const dataToHash = `${JSON.stringify(infos)}${nonce}`
    //console.log('Données hashées pour générer la preuve de travail :', dataToHash)
    const hash = sha256(dataToHash)

    if (hash.startsWith(targetPrefix)) {
      return { nonce, proofOfWork: hash }
    }
    nonce++
  }
}

async function verifyNonce(nonce) {
  if (!nonce.startsWith('000')) {
    return res.status(401).json({ error: 'Nonce incorrect !' })
  } else {
    return res.status(202)
  }
}
/*
async function verifyToken(token, req, db) {
  try {
    console.log('Début de la vérification du token...')

    // Décomposer et vérifier les informations du token
    const { userId, nonce, proofOfWork, expiresIn, deviceFingerprint } = token
    if (!userId || !nonce || !proofOfWork || !expiresIn || !deviceFingerprint) {
      console.error('Token incomplet ou invalide')
      return { valid: false, error: 'Token incomplet ou invalide' }
    }

    // Vérifier la proof of work
    const targetPrefix = '0'.repeat(3)
    const dataToHash = `${userId}${expiresIn}${deviceFingerprint}${nonce}`
    //console.log('Données pour preuve de travail (vérification) :', dataToHash)

    const recomputedProof = sha256(dataToHash)
    console.log('proofofwork recalculée :', recomputedProof)

    if (!recomputedProof.startsWith(targetPrefix)) {
      //console.error('La preuve recalculée ne correspond pas à la difficulté requise.')
      return { valid: false, error: 'Nonce ou preuve de travail invalide' }
    }
    console.log('Data pour PoW (génération) :', dataToHash)
    console.log('Nonce trouvé :', nonce, 'PoW générée :', proofOfWork)

    // Vérifier l'expiration
    const currentTime = Date.now()
    console.log('Temps actuel : ', currentTime, 'Expiration du token : ', expiresIn)
    if (currentTime > expiresIn) {
      console.error('Token expiré')
      return { valid: false, error: 'Token expiré' }
    }

    // Vérifier l'empreinte
    const fingerprint = generateDeviceFingerprint(req)
    console.log('Fingerprint : ', fingerprint, 'Device Fingerprint : ', deviceFingerprint)
    if (fingerprint !== deviceFingerprint) {
      console.error('Device Fingerprint invalide')
      return { valid: false, error: 'Device Fingerprint invalide' }
    }

    // Récupérer l'utilisateur et vérifier s'il existe
    const userModel = new UserModel(db.collection('users'))
    const user = await userModel.getById(userId)
    console.log('Utilisateur trouvé dans la base : ', user)
    if (!user) {
      console.error('Utilisateur non trouvé')
      return { valid: false, error: 'Utilisateur non trouvé' }
    }

    // Token valide
    console.log('Token validé du user : ', user)
    return { valid: true, user }
  } catch (err) {
    console.error('Erreur lors de la vérification du token : ', err)
    return { valid: false, error: 'Erreur serveur' }
  }
}
  */

// vérifier le token
module.exports = { generateNonce, verifyNonce }
