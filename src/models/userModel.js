const { ObjectId } = require('mongodb')

class UserModel {
  constructor(collection) {
    this.collection = collection
  }

  async getAll() {
    return await this.collection.find({}).toArray()
  }
  async getById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) })
  }
  async getSaltByMail(email) {
    const user = await this.collection.findOne({ email: email })
    return user ? user.salt : null
  }
  async getUserByMailAndHash(email, hash) {
    return await this.collection.findOne({ email: email, hash: hash })
  }
  async getUserByMail(email) {
    return await this.collection.findOne({ email: email })
  }
  async saveUser(userPayload) {
    return await this.collection.insertOne(userPayload)
  }
  async updateUserPassword(email, hash) {
    const result = await this.collection.updateOne(
      { email: email }, // Filtre pour trouver l'utilisateur par email
      { $set: { hash: hash } }, // Mettre à jour le mot de passe haché
    )
    return result.modifiedCount > 0 // Retourne true si un document a été modifié
  }
}

module.exports = UserModel
