const mongoose = require("mongoose")
// const userSchema = require("./userSchema")
// const blogSchema = require("./blogSchema")
require("dotenv").config()

const blogSchema =  mongoose.Schema({
    title: {type: String, required: [true, "{PATH} is required"]},
    body : {type: String, required: [true, "{PATH} is required"]},
    createdBy : {type : mongoose.Schema.ObjectId, ref: "user"},
    userOn :  {type : Date, default: Date.now},
});
const userSchema = mongoose.Schema({
    name : {type: String, required: [true, "name is required"]},
    username : {type : String, required : [true, "username must be provided"], unique : true},
    password : {type : String, minLength : [6, "cannot save {VALUE} in {PATH}"], required : [true, "password must be provided"] },
    blogs :  [{type : mongoose.Schema.ObjectId, ref : "blog"}],
    updatedpassword: {type: Date, default: Date.now()}
})

module.exports.User = mongoose.model("user", userSchema);
module.exports.Blog = mongoose.model("blog", blogSchema)

mongoose.connect("mongodb://127.0.0.1:27017/blogproject")
.then(()=>console.log("database is running"))
.catch(e=> console.log(e))
