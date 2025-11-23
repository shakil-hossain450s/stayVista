const express = require('express');
const router = express.Router();
const UsersCollection = require('../models/user.model');
const { getAllUsers, createUser, updateUserStatus } = require('../controllers/users.controller');

// get all user
router.get('/users', getAllUsers);

// get user role by email
router.get('/user/:email/role', async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email is required'
      })
    }

    const user = await UsersCollection.findOne({ email }).lean();
    if (!user) {
      return res.status(409).json({
        success: false,
        message: 'No user found'
      })
    }

    res.status(200).json({
      success: true,
      role: user?.role,
      data: user
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// create a user in db
router.post('/user', createUser);

// update the status 
router.patch('/user/status', updateUserStatus);

// update user data
router.patch('/user/updateUser', async (req, res) => {
  try {
    const { email, name, image_link } = req.body;

    const query = { email };
    const updatedDoc = {
      $set: { name }
    }

    const result = await UsersCollection.findOneAndUpdate(query, updatedDoc);
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: result
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: err.message
    })
  }
})



module.exports = router;