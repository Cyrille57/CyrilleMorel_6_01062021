///////////////////////////////////////////////
// Model //////////////////////////////////////
///////////////////////////////////////////////


// Contient le schéma de données user *********


//////////////////////////////////////////////////////////////////////////////////////////////
// Importe mongoose:
const mongoose = require('mongoose');


//////////////////////////////////////////////////////////////////////////////////////////////
// Importe le package de validation pour pré-valider les informations:
const uniqueValidator = require('mongoose-unique-validator');



//////////////////////////////////////////////////////////////////////////////////////////////
// Modèle de données pour un user est le suivant, avec la méthode Schema mise à disposition par Mongoose:
const userSchema = mongoose.Schema({
    // la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, s'assurera qu'aucun des deux utilisateurs ne peut partager la même adresse e-mail:
    email:      { type: String, required: true, unique: true }, //  adresse électronique de l'utilisateur [unique]
    password:   { type: String, required: true },// hachage du mot de passe de l'utilisateur
});


//////////////////////////////////////////////////////////////////////////////////////////////
userSchema.plugin(uniqueValidator);


//////////////////////////////////////////////////////////////////////////////////////////////
// Exporte le schéma en tant que modèle Mongoose appelé « User », le rendant par là même disponible pour l'application Express:
module.exports = mongoose.model('User', userSchema);