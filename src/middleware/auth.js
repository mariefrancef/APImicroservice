const crypto = require('crypto')

const hashPassword = async (plainPassword) => {
  try {
    let salt = randomString(5)

    const hashedPassword = crypto.createHmac('sha256', salt).update(plainPassword).digest('hex')
    return { hashedPassword, salt }
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error)
    throw error
  }
}

const verifyPassword = async (plainPassword, hashedPassword, salt) => {
  try {
    const hashToVerify = crypto.createHmac('sha256', salt).update(plainPassword).digest('hex')
    const match = hashToVerify === hashedPassword

    if (match) {
      console.log('✅ Mot de passe valide')
    } else {
      console.log('❌ Mot de passe invalide')
    }

    return match
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe :', error)
    throw error
  }
}

function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomStringResult = ''
  for (let i = 0; i < length; i++) {
    randomStringResult += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return randomStringResult
}

module.exports = { hashPassword, verifyPassword }
