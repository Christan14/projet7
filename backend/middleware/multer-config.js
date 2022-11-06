const multer = require("multer");

const MINE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
    "image/gif": "gif",
};

const storage = multer.diskStorage({
    destination : (error, file, callback) => {
        if (file.fieldname === "post_image") {
            callback(null, "./images/posts");
        } else if (file.fieldname === "profil_image") {
            callback(null, "./images/profils");
        }
    },
    filename: (error, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MINE_TYPE_MAP[file.mimetype];
        callback(null, name + Date.now() + "." + extension)
    },
});

module.exports = multer({ storage });