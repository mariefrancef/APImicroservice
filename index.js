const express = require('express')
const app = express()
const port = 3001

const { MongoClient, ServerApiVersion } = require('mongodb')
const userRoutes = require('./src/routes/userRoutes')
let UserModel = require('./src/models/userModel')
let cors = require('cors')
//const authRoutes = require("./src/utils/token.utils");

// Connexion MongoDB
const uri =
  'mongodb+srv://mariefrance:nHiySisDhgiXRhXZ@cluster0.ghtaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

app.use(express.json())
app.use(cors())

async function run() {
  try {
    await client.connect()
    const database = client.db('expressmariefrance')
    const userCollection = database.collection('users')
    const tokenCollection = database.collection('token')
    console.log('Connexion réussie à MongoDB')

    UserModel = new UserModel(userCollection)

    // Middleware pour ajouter la collection à chaque requête
    app.use((req, res, next) => {
      req.userCollection = userCollection
      req.tokenCollection = tokenCollection
      next()
    })

    app.use('/', userRoutes)
    //app.use("/", authRoutes);

    app.listen(port, () => {
      console.log(`API en cours d'exécution sur http://localhost:${port}`)
    })
  } catch (err) {
    console.error(err)
  }
}

run().catch(console.dir)
