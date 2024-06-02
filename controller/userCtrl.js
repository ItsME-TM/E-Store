const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
        //Check for the user from email
        const email = req.body.email;
        const findUser = await User.findOne({email:email});
        if(!findUser) {
                //Create a new user
                const newUser = await User.create(req.body);
                res.json(newUser);
                console.log(newUser);
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
});

//Get a user info
const getAUser = asyncHandler(async(req, res) => {
        const {id} = req.user;
        console.log(id);
        try{
                const aUser = await User.findById(id);
                res.json(aUser);
        }
        catch(error){
                throw new Error(error);
        }
});


//Delete a user info
const deleteAUser = asyncHandler(async(req, res) => {
        const {id} = req.params;
        try{
                const deleteUser = await User.findByIdAndDelete(id);
                console.log(deleteUser);
        }
        catch(error){
                throw new Error(error);
        }
});


//Update a user
const updateUser = asyncHandler(async(req, res) => {
        const {_id} = req.user;
        try{
                const updateUser = await User.findByIdAndUpdate(_id,
                        {
                                firstname: req?.body?.firstname,
                                lastname: req?.body?.lastname,
                                email: req?.body?.email,
                                mobile: req?.body?.mobile,
                        },
                        {
                                new: true,
                        }
                );
                console.log(updateUser);
                res.json(updateUser);
        }
        catch(error){
                throw new Error(error);
        }
});

const blockUser = asyncHandler(async(req, res) => {
        const {id} = req.params;
        console.log("hit block");
        try{
                const block = await User.findByIdAndUpdate(id,{
                        isBlocked : true,
                },{
                        new : true,
                });
                res.json({message: "User blocked"});
        }catch(error){
                throw new Error(error);
        }
});

const unblockUser = asyncHandler(async (req, res) => {
        const { id } = req.params;
        console.log("hit unblock");
        try {
            const unblock = await User.findByIdAndUpdate(id, {
                isBlocked: false,
            }, {
                new: true,
            });
            res.json({ message: "User unblocked"});
        } catch (error) {
            throw new Error(error);
        }
    });


module.exports = {createUser, loginUserCtrl, getAllUsers, getAUser, deleteAUser, updateUser, blockUser, unblockUser};