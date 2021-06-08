const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// Importe le model sauce:
const sauceCtrl = require('../controllers/sauce')

// CREATION ////////////////////////////////////
router.post('/', auth, sauceCtrl.createSauce);

// MODIFICATION ////////////////////////////////
router.put('/:id', auth, sauceCtrl.modifySauce);

// SUPPRESION //////////////////////////////////
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// LECTURE /////////////////////////////////////
router.get('/:id', auth, sauceCtrl.getOneSauce);

// LECTURE ALL//////////////////////////////////
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;