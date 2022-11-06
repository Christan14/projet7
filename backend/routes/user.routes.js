const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const userCotrller = require("../controllers/user.controllers");

router.post("/signup", userCotrller.signup); // create a new user
router.post("/signin", userCotrller.signin); // sign in a user
router.get("logout", userCotrller.getUsers); // get all users
router.get("/profils", userCotrller.getUsers); // get a user
router.get("/profil/:id", userCotrller.getUser); // Get a user
router.put(
  "/update/:id",
  auth,
  multer.single("profil_image"),
  userCotrller.updateUser
); // update a user
router.delete("/delete/:id", auth, userCotrller.deleteUser); // delete a user

module.exports = router;
