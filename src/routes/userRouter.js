const express = require('express')
const userRouter = express.Router();

userRouter.get("/",async(req,res) => {
    res.render('home')
})


module.exports = userRouter;