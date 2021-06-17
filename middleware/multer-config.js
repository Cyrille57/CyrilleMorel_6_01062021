///////////////////////////////////////////////
// Middleware multer: /////////////////////////
///////////////////////////////////////////////


// Importe le package qui permet de gérer les fichiers entrants dans les requêtes HTTP:
const multer = require('multer');

// Dictionnaire de type MIME:
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Storage , à passer à multer comme configuration, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrant:
const storage = multer.diskStorage({
    // destination indique à multer d'enregistrer les fichiers dans le dossier images:
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // Filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier:
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    // Dictionnaire de type MIME pour résoudre l'extension de fichier appropriée:
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exportation de l'élément multer entièrement configuré, on passe la constante storage en lui indiquand de gérers uniquement les téléchargements de fichiers image:
module.exports = multer({storage: storage}).single('image');