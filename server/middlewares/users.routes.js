const express = require('express');
const router = express.Router();
const UsersCollection = require('../models/user.model');
const { getAllUsers, createUser, updateUserStatus } = require('../controllers/users.controller');

// get all user
router.get('/users', getAllUsers);

// create a user in db
router.post('/user', createUser);

// update the status 
router.patch('/user/status', updateUserStatus);

module.exports = router;