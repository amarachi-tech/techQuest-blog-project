const express = require("express")
const blogRouter = require("./blogUsers/router/blogs")
const userRouter = require("./blogUsers/router/users")
const authRouter = require("./blogUsers/router/authentication")
const cookieParser = require("cookie-parser")
const app = express()



app.use(cookieParser())
app.use("/blogs", blogRouter)
app.use("/users", userRouter)
app.use("/auth", authRouter)



app.listen(3000, function(){
    console.log("running on port 3000")
})
