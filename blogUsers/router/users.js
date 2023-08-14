const express = require("express");
const { updateAUser, getUsers, getOneUser, getMyProfile } = require("../Cotroller/userController");
const { getMyBlogs } = require("../Cotroller/blogControllers");
const { isAuthorized } = require("../../middleware/authorization");

const router = express.Router();




router.use(express.json());


//get all users
router.get("/user", getUsers)
//create new user
router.get("/profile", isAuthorized, getMyProfile)

//get one users
router.get("/:id", getOneUser)


//update a user
router.patch("/:id", updateAUser)

module.exports = router;