const express = require("express")
const mongoose =require("mongoose")
const { Blog } = require("../database/db");
const { asyncErrorhandler } = require("../errorHandler/asyncerrorhandler");

const router = express.Router

module.exports.getAllBlogs = asyncErrorhandler(async function(req, res){
    // console.log("getting user")
    const blogs = await Blog.find({})
    res.json({data: blogs, success: true})
})

module.exports.getABlog = asyncErrorhandler(async function(req, res){
    console.log("getting single user")
    const id = req.params._id 
    const newBlogs = await Blog.findById(id).populate("createdBy")
    res.json({data: newBlogs, success: true})
})


module.exports.createABlog = asyncErrorhandler(async function(req, res){
        console.log("createing user")
        const newBlog = Blog.create(req.body)
        res.json({data: newBlog, success: true, message: "created successfully"})     

})

module.exports.getMyBlogs = asyncErrorhandler(async function(req, res){
    //this will run if the user exist
    const userBlog = await Blog.findOne(req.body._id).populate("createdBy", "-password")
    return res.json({data: userBlog, message: `this is the blog posts of ${userName}` })
})

module.exports.updateAblog = asyncErrorhandler(async function(req, res){
    console.log("updating user")
    const updateValue = req.body
    console.log(updateValue)
    const id = req.params._id
    await Blog.updateOne({_id : id}, updateValue)
    res.json({message : "updated successfull", success: true})
})

