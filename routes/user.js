///////////////////////////////////////////////
// Logique de routing user: ///////////////////
///////////////////////////////////////////////


// Importe Express dans une constante avec la commande require:
const express = require('express');
// Création du routeur Express:
const router = express.Router();

// Importe le middleware d'authentification:
const auth = require('../middleware/auth');

// Importe le contrôleur user:
const userCtrl = require('../controllers/user');


// SIGNUP ////////////////////////////////////
router.post('/signup', userCtrl.signup);

// lOGIN /////////////////////////////////////
router.post('/login', userCtrl.login);

// Exporte les routes:
module.exports = router;