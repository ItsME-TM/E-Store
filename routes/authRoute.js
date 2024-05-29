const express = require('express');
const { createUser, loginUserCtrl, getAllUsers, getAUser, deleteAUser, updateUser } = require('../controller/userCtrl');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUsers);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);
router.put("/:id", updateUser);
module.exports = router;