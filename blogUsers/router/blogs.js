const express = require("express");
const router = express.Router()

const { getAllBlogs, getABlog, updateAblog, createABlog, getMyBlogs } = require("../userCotroller/blogControllers");
const { isAuthorized } = require("../../middleware/authorization");


router.use(express.json())

router.get("/blog",  getAllBlogs)

router.post("/blog", isAuthorized, createABlog)

//get a logged in user blogs
router.get("/myblogs", isAuthorized, getMyBlogs)



router.put("/blog/:_id", isAuthorized, updateAblog)

router.delete("/user/:id", async function(req, res){
    console.log("deleting user")
})

module.exports = router