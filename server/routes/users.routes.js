const express = require('express');
const router = express.Router();
const UsersCollection = require('../models/user.model');

// get all user
router.get('/users', async (req, res) => {
  try {
    const users = await UsersCollection.find().lean();
    res.status(200).json({
      success: true,
      data: users
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
router.post('/user', async (req, res) => {
  try {
    const user = req.body;
    const query = { email: user?.email };

    // check if user already exists or not
    const userExists = await UsersCollection.findOne(query);
     if (userExists) {
      return res.status(200).json({
        message: 'User already exists',
        inserted: false,
        user: userExists
      });
    }


    const result = await UsersCollection.create(user);

    res.status(201).json({
      success: true,
      data: result
    })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router;