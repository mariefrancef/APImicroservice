const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const userRoutes = require("./src/routes/user");
const marchandiseRoutes = require("./src/routes/router");
const marchandiseController = require("./src/controllers/marchandiseController");

const app = express();
const port = 3000;

const uri = "mongodb+srv://lucasplebani:hN1e4bZKgSJ3JQih@cluster0.ghtaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
 
});

app.use(express.json()); 
// connection BDD
async function run() {
  try {
    await client.connect();
    console.log("Connection à la base de données réussie");

    const database = client.db("ExpressLucas");
    const collection = database.collection("marchandise");

    
    app.locals.db = database; // Ajout de la base de données à l'objet app.locals

    marchandiseController.init(collection);

    // Ajout des routes authentification | marchandises
    app.use("/api/auth", userRoutes);
    app.use("/", marchandiseRoutes); 

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

