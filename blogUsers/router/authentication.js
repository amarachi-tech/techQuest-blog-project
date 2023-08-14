const express = require("express")
const { createUser, login, logout, getProfile, changePassword } = require("../Cotroller/authController")
const cookieParser = require("cookie-parser")
const { isAuthorized } = require("../../middleware/authorization")

const router = express.Router()
router.use(cookieParser())


router.use(express.json())

router.post("/register", createUser)
router.post("/login",  login)
router.post("/changepass", isAuthorized, changePassword)
router.get("/logout", logout)

module.exports = router

