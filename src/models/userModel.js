const { ObjectId } = require("mongodb");

class UserModel {
  constructor(collection) {
    this.collection = collection;
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }
  async getById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }
  async getSaltByMail(mail) {
    const user = await this.collection.findOne({ mail: mail });
    return user ? user.salt : null;
  }
  async getUserByMailAndHash(mail, hash) {
    return await this.collection.findOne({ mail: mail, hash: hash });
  }
  async getUserByMail(mail) {
    return await this.collection.findOne({ mail: mail });
  }
  async saveUser(userPayload) {
    return await this.collection.insertOne(userPayload);
  }
  async updateUserPassword(mail, hash) {
    const result = await this.collection.updateOne(
      { mail: mail }, // Filtre pour trouver l'utilisateur par mail
      { $set: { hash: hash } } // Mettre à jour le mot de passe haché
    );
    return result.modifiedCount > 0; // Retourne true si un document a été modifié
  }
}

module.exports = UserModel;
