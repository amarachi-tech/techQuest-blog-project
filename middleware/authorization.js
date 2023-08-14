// const { next } = require("cli");
const { asyncErrorhandler } = require("../blogUsers/errorHandler/asyncerrorhandler");
const {User} = require("../blogUsers/database/db")
const jwt = require("jsonwebtoken")

module.exports.isAuthorized = asyncErrorhandler(async function(req, res, next){
    const token = req.cookies.authorization
    if(!token) return res.status(401).json({message: "Authorization failed, please login", success: false})
    //check if token is valid
    const decodedData = jwt.verify(token, process.env.JWTSECRET)
    // console.log(token)
    //fetching back the user contained in the token
    const user = await User.findById(decodedData._id).populate("blogs")
    //compare the time bettween the last login to when user changed password
    console.log(user)
    const iat = decodedData.iat * 1000
    // const passwordupdatedon = new Date(user.updatedpassword).getTime()
    // console.log(iat, passwordupdatedon)
    if(iat < new Date(user.updatedpassword).getTime()) return res.status(401).json({message: "request failed, enter correct password", success: false})
    //check if password exist
    if(!user) return res.json({data: user, message: " No user found"})
    //if they all checks out call next
    req.user = user
    next()
    //if not we want to respond with an error from our error handdler
})