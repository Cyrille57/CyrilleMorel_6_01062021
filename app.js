// Importe Express dans une constante avec la commande require:
const express = require('express');

// Crer une application Express:
const app = express();

// Configure une réponse:
app.use((req, res) => {
    res.json({ message: 'Votre requête a tres tres bien été reçue !' }); 
 });

// Exporte l'application pour y accéder depuis les autre fichier et surtout depuis server.js
module.exports = app;
