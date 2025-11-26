const UsersCollection = require('../models/user.model');
const sendEmail = require('../services/email.service');

// get all user
const getAllUsers = async (req, res) => {
  try {
    const users = await UsersCollection.find().lean().sort({ createdAt: -1 });
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

// get a single user
const getSingleUser = async (req, res) => {
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
      data: user
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// get user role by email
const getUserRole = async (req, res) => {
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

    sendEmail(user?.email, {
      subject: 'Welcome',
      message: `Hope you will find your destinations.` 
    });

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

// // update user name
const updateUserName = async (req, res) => {
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
}

// update user role by email
const updateUserRole = async (req, res) => {
  try {
    const { roleData, status } = req.body;
    const email = req.params.email;

    const query = { email };
    const updatedDoc = {
      $set: {
        role: roleData,
        status
      }
    }

    await UsersCollection.findOneAndUpdate(query, updatedDoc);
    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      role: roleData
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { getAllUsers, getSingleUser, getUserRole, createUser, updateUserStatus, updateUserName, updateUserRole };