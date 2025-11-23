const express = require('express');
const router = express.Router();
const UsersCollection = require('../models/user.model');
const { getAllUsers, createUser, updateUserStatus, updateUserRole, updateUserName, getUserRole } = require('../controllers/users.controller');

// get all user
router.get('/users', getAllUsers);

// get user role by email
router.get('/user/:email/role', getUserRole)

// create a user in db
router.post('/user', createUser);

// update the status 
router.patch('/user/status', updateUserStatus);

// update user name
router.patch('/user/updateUser', updateUserName);

// update user role
router.patch('/user/:email/role', updateUserRole);



module.exports = router;