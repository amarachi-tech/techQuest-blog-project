
const { User } = require("../database/db");
const { asyncErrorhandler } = require("../errorHandler/asyncerrorhandler");
const bcryptjs = require("bcryptjs")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const db = require("../database/db")

// {
//     username, password, name
// }
module.exports.createUser = asyncErrorhandler(async function(req, res){
        const {password, ...other} = req.body;
        console.log("HIT ROUTE", req.body) 
        if(password.length < 6 || password.length > 15) return res.json({message : "password length must be less than 15 and greater than 5", success : false})
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = {password : hashedPassword, ...other}
        console.log(newUser)
        const user = await User.create(newUser);
    // after user has succefully been created now we want to create a token
    // we want create a token to identify this user across our application:
    // jwt create token using sign
        const token = jwt.sign({_id: user._id}, process.env.JWTSECRET)
        res.cookie("auth", token)
        return res.json({data: user, message:"new user created successfully", success: true})
})


module.exports.login = asyncErrorhandler(async function(req, res){
    const {username, password} = req.body
   
    const user = await User.findOne({username})
    if(!user) return res.json({data: null, message: "no user found"})
    const check = await bcryptjs.compare(password, user.password)
    if(!check) return res.json({data: null, message: "authentication failed"})

    //anything here will run if the password match
    const token = jwt.sign({_id : user._id}, process.env.JWTSECRET)
    res.cookie("authorization", token)
    return res.status(200).json({message: "successfully logged in", success: true})

})

module.exports.logout = asyncErrorhandler(async function(req, res){
    res.cookie("authorization", "", {maxAge: 1})
    return res.json({message: "Successfully logged out", success: false})
})

module.exports.changePassword = asyncErrorhandler(async function(req, res){
    console.log("password changed")
    const userPassword = req.body.password
    if(userPassword.length < 6) return res.status(401).json({message: "password most be greater than 6", success: false})
    const hashedPassword = await bcryptjs.hash(userPassword, 10);
    console.log(hashedPassword)
    await User.updateOne({_id: req.user._id}, {password: hashedPassword})
    return res.status(200).json({message: "successfully Updated", success: true})
})

module.exports.getProfile = asyncErrorhandler(async function(req, res){
    res.json({message: "LOGIN SUCCESSFULL!"})
})