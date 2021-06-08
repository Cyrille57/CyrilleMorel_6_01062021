///////////////////////////////////////////////
// Logique globale de l'application ///////////
///////////////////////////////////////////////

// Importation des modelss:
const Sauce = require("../models/Sauce");

// CREATION ////////////////////////////////////
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    userId:         req.body.userId,
    name:           req.body.name,
    manufacturer:   req.body.manufacturer,
    description:    req.body.description,
    mainPepper:     req.body.mainPepper,
    imageUrl:       `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    heat:           req.body.heat,
    likes:          req.body.likes,
    dislikes:       req.body.dislikes,
    usersLiked:     req.body.usersLiked,
    usersDisliked:  req.body.usersDisliked,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
    })
  })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
// MODIFICATION ////////////////////////////////
exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    _id: req.params.id,
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });
  Sauce.updateOne(
    {
      _id: req.params.id,
    },
    sauce
  )
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
// SUPPRESION //////////////////////////////////
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({
    _id: req.params.id,
  })
    .then(() =>
      res.status(200).json({
        message: "Sauce supprimé !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};
// LECTURE /////////////////////////////////////
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
// LECTURE ALL//////////////////////////////////
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};


