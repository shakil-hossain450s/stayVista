const UsersCollection = require('../models/user.model');

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access'
      })
    }

    const user = await UsersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    if (user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden access! Only admin access this route'
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

module.exports = verifyAdmin;