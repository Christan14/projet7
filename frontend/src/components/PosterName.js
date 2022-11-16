import React from "react";
import "../styles/posterName.css";

const PosterName = ({ pseudo, profil }) => {
  return ( // L'instruction arrête l'exécution d'une fonction et renvoie une valeur.
    <div className="block-image">
      <img src={profil} alt="" className="photo-profil" /> <span>{pseudo}</span>
    </div>
  );
};

export default PosterName;