///////////////////////////////////////////////
// Logique globale de l'application (user) ////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importe le package de chiffrement bcrypt:
const bcrypt = require("bcrypt");


//////////////////////////////////////////////////////////////////////////////////////////////
// Importe le package qui créer et vérifie les tokens d'authentification:
const jwt = require("jsonwebtoken");


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation du models user:
const User = require("../models/User");


//////////////////////////////////////////////////////////////////////////////////////////////
// Regex:
/*
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//  Contient au moins une lettre minuscule ( ?=.*[a-z]), une lettre majuscule ( ?=.*[A-Z]), un chiffre ( ?=.*[0-9]), un caractère spécial ( ?=.*[^A-Za-z0-9]) et au moins huit caractères ( ?=.{8,}):
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/
*/

//////////////////////////////////////////////////////////////////////////////////////////////
// Fonction pour inscrire le user:

exports.signup = (req, res, next) => {

  // Récupére l'email et le password::
  var email= Buffer.from(req.body.email).toString("base64") // Convertit l'email en chaine de caractére
  var password = req.body.password

  // Utilisation des regex :
  /*
  if (!emailRegex.test(email)){
    return res.status(400).json({ 'error': "L'email n'est pas valide !"})
  }
  
  
  if (!passwordRegex.test(password)){
    return res.status(400).json({ 'error' : " Mot de passe invalide ! Doit contenir une lettre minuscule, une lettre majuscule, un chiffre, un caractère spécial et au moins huit caractères!"})
  }
  */
/*
  // Vérifie la longueur du mdp:
  if ( password.length != 8){
    return res.status(400).json({ 'error': "Le mot de passe doit contenir uniquement 8 caractére !"})
  }
 */ 
  // Implémente la fonction de hachage de bcrypt:
  bcrypt
  //  Sale le mot de passe 10 fois:
    .hash(password, 10)
    .then((hash) => {
      // Créer un utilisateur et l'enregistrons dans la base de données:
      const user = new User({
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé !",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};



//////////////////////////////////////////////////////////////////////////////////////////////
// Fonction login qui vérifie si un user qui tente de se connecter dispose d'identifiants valides:
exports.login = (req, res, next) => {
  var email= Buffer.from(req.body.email).toString("base64")
  //  Vérifie si l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données:
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        // Retourne une erreur 401 Unauthorized
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //console.log(user.password)
      //console.log(req.body.password)
      // bcrypt.compare le mdp  entré par l'utilisateur avec le hash enregistré dans la base de données:
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            // Retourne une erreur 401 Unauthorized
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            // Réponse 200 contenant l'ID utilisateur et un token:
            userId: user._id,
            // sign de jsonwebtoken encode le nouveau token:
            token: jwt.sign(
              // Contient l'ID de l'user en tant que payload (les données encodées dans le token):
              { userId: user._id },
              // Chaîne secrète pour encoder le token placé dans le fichier.env:
              (process.env.tokenLogInUser),
              // Validité du token 24 heures:
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
