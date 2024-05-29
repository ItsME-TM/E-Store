const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
        //Check for the user from email
        const email = req.body.email;
        const findUser = await User.findOne({email:email});
        if(!findUser) {
                //Create a new user
                const newUser = User.create(req.body);
                res.json(newUser);
        }
        else {
                //User already exists
                res.json({
                        msg:"User already exists with this email address",
                        success: false,
                });
        }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
        const {email, password} = req.body;
        const findUser = await User.findOne({email});
        if(findUser && await findUser.isPasswordMatched(password)){
                res.json({
                        _id: findUser?._id,
                        firstname: findUser?.firstname,
                        lastname: findUser?.lastname,
                        email: findUser?.email,
                        mobile: findUser?.mobile,
                        token: generateToken(findUser?._id),
                });
        }
        else{
                throw new Error("Invalid Credentials");
        }

});

//Get all user info
const getAllUsers = asyncHandler(async(req, res) => {
        try{
                const getUsers = await User.find();
                res.json(getUsers);
        }
        catch(error){
                throw new Error(error);
        }
})


module.exports = {createUser, loginUserCtrl, getAllUsers};