const bcrypt = require("bcrypt");

const hashPassword = async (plainPassword) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(plainPassword, salt);
    return { hashedPassword, salt };
  } catch (error) {
    console.error("Erreur lors du hachage du mot de passe :", error);
    throw error;
  }
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (match) {
      console.log("✅ Mot de passe valide");
    } else {
      window.alert("Veuillez saisir le bon mot de passe");
      console.log("❌ Mot de passe invalide");
    }
    return match;
  } catch (error) {
    console.error("Erreur lors de la vérification du mot de passe :", error);
    throw error;
  }
};

module.exports = { hashPassword, verifyPassword };
