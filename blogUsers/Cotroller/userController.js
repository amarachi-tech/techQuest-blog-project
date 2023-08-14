const mongoose = require("mongoose")
const {asyncErrorhandler} = require("../errorHandler/asyncerrorhandler");
const {User} = require("../database/db");


module.exports.getUsers = asyncErrorhandler(async function(req, res){
    const users = await User.find({});
    return res.json({data: users, success: true})
})

module.exports.createUser = asyncErrorhandler(async function(req, res){
    const newUser = User.create(req.body)
    res.json({data: newUser, success: true, message: "user created successfully"})
})

module.exports.getOneUser = asyncErrorhandler(async function(req,res){
    const id = req.params.id 
    const user = await User.findOne({_id: id}).populate("blogs")
    return res.json({data: user, success: true})
})

module.exports.getMyProfile = asyncErrorhandler(async function(req, res){
    res.json({data: req.user, success: true})
})

module.exports.updateAUser = async function(req, res){
    try{
        const updateValue = req.body
        const id = req.param.id
        const user = await User.updateOne({_id : id}, updateValue)
        res.json({data: user, success: true, message: "edited successfull"})
    }catch(err){
        res.json({err: err.message})
    }
}
