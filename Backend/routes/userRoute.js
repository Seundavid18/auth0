const express = require("express");

const router = express.Router();

const {signup, getAllUser, getOneUser, deleteUser, login, protected} = require("../controllers/user");
const verifyUser = require("../middleware/authorize")


router.post("/signup", signup)
router.get("/alluser", getAllUser);
router.get("/oneuser/:id", getOneUser)
router.delete("/removeuser/:id", deleteUser)
router.post("/login", login)
router.get("/protected", verifyUser, protected)



module.exports = router;
