///////////////////////////////////////////////
// Model //////////////////////////////////////
///////////////////////////////////////////////


// Contient le schéma de données sauce ********


//////////////////////////////////////////////////////////////////////////////////////////////
// Importe mongoose:
const mongoose = require('mongoose');


//////////////////////////////////////////////////////////////////////////////////////////////
// Modèle de données pour une sauce est le suivant, avec la méthode Schema mise à disposition par Mongoose:
const sauceSchema = mongoose.Schema({
  userId:           { type: String, required: true }, // Identifiant unique MongoDB pour l'utilisateur qui a créé la sauce
  name:             { type: String, required: true }, // Nom de la sauce
  manufacturer:     { type: String, required: true }, // Fabricant de la sauce
  description:      { type: String, required: true }, // Description de la sauc
  mainPepper:       { type: String, required: true }, // Principal ingrédient dans la sauce
  imageUrl:         { type: String, required: true }, // String de l'image de la sauce téléchargée par l'utilisateur
  heat:             { type: Number, required: true }, // Nombre entre 1 et 10 décrivant la sauce
  likes:            { type: Number, required: true, default:0 }, // Nombre d'utilisateurs qui aiment la sauce
  dislikes:         { type: Number, required: true, default:0}, // Nombre d'utilisateurs qui n'aiment pas la sauce
  usersLiked:       { type: Array, required: true, default:[] }, // Tableau d'identifiants d'utilisateurs ayant aimé la sauce
  usersDisliked:    { type: Array, required: true, default:[]  }, // Tableau d'identifiants d'utilisateurs n'aime pas  la sauce
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Exporte le schéma en tant que modèle Mongoose appelé « Sauce », le rendant par là même disponible pour l'application Express:
module.exports = mongoose.model('Sauce', sauceSchema);
