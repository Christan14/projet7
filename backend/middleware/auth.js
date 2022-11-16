const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      error: "Vous devez vous connecter",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded._id).then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur introuvable",
        });
      } else {
        if (
          user._id.toString() === decoded._id || // si l'utilisateur est le propriétaire de la publication
          decoded.isAdmin === true // l'utilisateur est administrateur
        ) {
           // si l'utilisateur est admin ou si l'utilisateur est le même que celui qui a envoyé la requête
          next();
        } else {
          return res.status(403).json({
            message: "Interdit",
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};
