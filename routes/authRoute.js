const express = require('express');
const { createUser, loginUserCtrl, getAllUsers, getAUser, deleteAUser, updateUser } = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../models/authMiddleware');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.delete("/:id", deleteAUser);
router.put("/:edit_user",authMiddleware, updateUser);
module.exports = router;