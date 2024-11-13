const { hashPassword } = require("../middleware/auth");
const UserModel = require("../models/userModel");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nom, email et mot de passe sont requis" });
    }

    //console.log("Hashing du mot de passe...");
    const { hashedPassword, salt } = await hashPassword(password);
    const user = new UserModel(name, email, hashedPassword, salt);

    // Insérer dans la base de données
    //console.log("Insertion de l'utilisateur dans la base de données...");
    await req.userCollection.insertOne(user);
    //console.log("Utilisateur inséré avec succès");
    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

const login = async (req, res) => {};

module.exports = { signup, login };
