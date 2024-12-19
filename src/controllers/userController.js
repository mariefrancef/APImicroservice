const { hashPassword, salt, verifyPassword } = require('../middleware/auth')
const UserModel = require('../models/userModel')
const { generateToken } = require('../models/tokenModel')
const { generateNonce, verifyNonce, verifyToken } = require('../utils/token.utils')
const { pbkdf2 } = require('node:crypto')

const userPayload = (name, email, password, salt) => {
  if (name === null || email === null || password === null) {
    return res.status(401).json({ error: 'Veuillez remplir tous les champs' })
  }
  let payLoad = { name: name, email: email, password: password, salt: salt }
  return payLoad
}

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe sont requis' })
    }

    //console.log('Hashing du mot de passe...')
    const { hashedPassword, salt } = await hashPassword(password)
    const user = userPayload(name, email, hashedPassword, salt)

    //console.log("Insertion de l'utilisateur dans la base de données...")
    await req.userCollection.insertOne(user)
    //console.log('Utilisateur inséré avec succès')
    res.status(201).json({ message: 'Utilisateur créé avec succès !' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" })
  }
}

const login = async (req, res, next) => {
  try {
    const user = await req.userCollection.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ error: "L'utilisateur n'existe pas !" })
    }

    const { password: hashedPassword, salt } = user
    const valid = await verifyPassword(req.body.password, hashedPassword, salt)
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe incorrect !' })
    }

    const tokenGenerated = await generateToken(req, user)
    console.log('token généré : ' + tokenGenerated)

    const { nonce, proofOfWork } = generateNonce(tokenGenerated)
    tokenGenerated.nonce = nonce
    tokenGenerated.proofOfWork = proofOfWork
    console.log('nonce : ' + nonce)
    console.log('proofofwork : ' + proofOfWork)

    console.log('Vérification du token généré ...')
    const verificationResult = await verifyToken(tokenGenerated, req, req.db)
    if (!verificationResult.valid) {
      console.error('Erreur de vérification du token : ', verificationResult.error)
      return res.status(401).json({ error: 'Échec de la vérification du token' })
    }
    console.log('Token validé avec succès pour le user : ', verificationResult.user)

    res.status(200).json({
      userId: user._id,
      token: tokenGenerated,
    })
    //console.log('Utilisateur trouvé :', user)
    //console.log('Salt utilisé :', salt)
    //console.log('Mot de passe haché :', hashedPassword)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

// tokenPayload.nonce = nonce
// tokenPayload.proofOfWork = proofOfWork

// proofOfWork : toutes les informations de Token concaténés + hashé + nonce

module.exports = { signup, login }
