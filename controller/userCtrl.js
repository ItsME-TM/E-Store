const User = require('../models/userModel');

const createUser = async (req, res) => {
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
};

module.exports = {createUser};