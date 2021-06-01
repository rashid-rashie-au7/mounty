const express = require('express')
const userRouter = express.Router();
const {getUserData,getUserCreation,addUserData,getSortedData} = require('../controllers/userController')

userRouter.route('/').get(getUserData);

userRouter.route('/newuser').get(getUserCreation)

userRouter.route('/newuser').post(addUserData);

userRouter.route('/createdby').get(getSortedData);

userRouter.route('/coordinates').get(getSortedData);


module.exports = userRouter;