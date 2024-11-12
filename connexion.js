const express = require("express");
const app = express();
const port = 3001;

const { MongoClient, ServerApiVersion } = require("mongodb");
const marchandiseRoutes = require("./src/routes/marchandiseRoutes");
const marchandiseController = require("./src/controllers/marchandiseController");
//const marchandiseController = require("./controllers/marchandiseController");

const uri =
  "mongodb+srv://mariefrance:nHiySisDhgiXRhXZ@cluster0.ghtaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json());

async function run() {
  try {
    // Connexion à la base de données
    await client.connect();
    const database = client.db("expressmariefrance");
    const collection = database.collection("marchandise");

    marchandiseController.init(collection);

    app.use("/", marchandiseRoutes);

    // Middleware pour gérer les erreurs 500 (erreurs serveur)
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: "Erreur interne du serveur" });
    });

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`API en cours d'exécution sur http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
