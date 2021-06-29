///////////////////////////////////////////////
// Logique de routing sauce: //////////////////
///////////////////////////////////////////////


// Importe Express dans une constante avec la commande require:
const express = require('express');

// Création du routeur Express:
const router = express.Router();

// Importe le middleware d'authentification:
const auth = require('../middleware/auth');

// Importe le package qui permet de gérer les fichiers entrants dans les requêtes HTTP:
const multer = require('../middleware/multer-config');

// Importe le contrôleur sauce:
const sauceCtrl = require('../controllers/sauce')


///////////////////////////////////////////////
// CREATION ///////////////////////////////////
router.post('/', auth, multer, sauceCtrl.createSauce);

///////////////////////////////////////////////
// MODIFICATION ///////////////////////////////
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

///////////////////////////////////////////////
// SUPPRESION /////////////////////////////////
router.delete('/:id', auth, sauceCtrl.deleteSauce);

///////////////////////////////////////////////
// LECTURE ////////////////////////////////////
router.get('/:id', auth, sauceCtrl.getOneSauce);

///////////////////////////////////////////////
// LECTURE ALL/////////////////////////////////
router.get('/', auth, sauceCtrl.getAllSauces);

///////////////////////////////////////////////
// Like ///////////////////////////////////////
router.post('/:id/like', auth, sauceCtrl.createLikeDislakeSauce);


// Exporte les routes:
module.exports = router;