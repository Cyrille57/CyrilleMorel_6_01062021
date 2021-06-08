// Importe Express dans une constante avec la commande require:
const express = require('express');
// Importe le package body-parser:
const bodyParser = require('body-parser');
// Importe mongoose:
const mongoose = require('mongoose');

const path = require('path');
// Importe le routeur de User:
const sauceRoutes = require('./routes/sauce');
// Importe le routeur de User:
const userRoutes = require('./routes/user');

////////////////////////////////////////////////////////////////////////////////////////
// Connexions à la bdd:
//mongoose.connect('mongodb+srv://User-1:M0n6OD8-2101-57070@cluster0.ncavz.mongodb.net/Pekocko?retryWrites=true&w=majority',
mongoose.connect('mongodb+srv://user-read-write:rp5E2NaTB89xGyY@cluster0.ncavz.mongodb.net/Pekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Crer une application Express:
const app = express();

////////////////////////////////////////////////////////////////////////////////////////
// Etape pour autoriser les connexions a l'api
// sur l'objet réponse permet l'envoi et la réception de requêtes et de réponses sans erreurs CORS
// Middleware générale, qui ajoute des headers pour permettre l'accées a l'api:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;