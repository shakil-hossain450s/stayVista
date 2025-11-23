const UsersCollection = require('../models/user.model');

const verifyHost = async (req, res, next) => {
  try {
    // get the decoded user email
    const email = req.user?.email;
    // if email not exists return unautorized
    if (!email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access'
      });
    }

    // get the user data by decoded email
    const user = await UsersCollection.findOne({ email });
    // if user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // if user role is not host throw forbidde access
    if (user?.role !== 'host') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden access!!'
      })
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = verifyHost;