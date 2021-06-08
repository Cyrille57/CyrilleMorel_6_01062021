const express = require('express');
const router = express.Router();

// Importe le model sauce:
const sauceCtrl = require('../controllers/sauce')

// CREATION ////////////////////////////////////
router.post('/', sauceCtrl.createSauce);

// MODIFICATION ////////////////////////////////
router.put('/:id', sauceCtrl.modifySauce);

// SUPPRESION //////////////////////////////////
router.delete('/:id', sauceCtrl.deleteSauce);

// LECTURE /////////////////////////////////////
router.get('/:id', sauceCtrl.getOneSauce);

// LECTURE ALL//////////////////////////////////
router.get('/', sauceCtrl.getAllSauces);

module.exports = router;