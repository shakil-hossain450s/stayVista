const UsersCollection = require('../models/user.model');

// get all user
const getAllUsers = async (req, res) => {
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
}

// create a user in db
const createUser = async (req, res) => {
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
}

// update the status
const updateUserStatus = async (req, res) => {
  try {
    const { status, email } = req.body;
    const query = { email }

    // console.log(req.body);

    // check the role is already updated or not
    const user = await UsersCollection.findOne(query);
    if (user && user.status === 'requested') {
      return res.status(200).json({
        success: false,
        message: 'Already requested. Please wait for admin approval 👊'
      })
    }

    const updatedDoc = {
      $set: { status: status }
    }
    const options = { new: true }

    const result = await UsersCollection.findOneAndUpdate(query, updatedDoc, options);
    res.status(200).json({
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
}

module.exports = { getAllUsers, createUser, updateUserStatus };