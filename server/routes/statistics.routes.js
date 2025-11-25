const express = require('express');
const router = express.Router();

const BookingsCollection = require('../models/booking.model');
const UsersCollection = require('../models/user.model');
const RoomsCollection = require('../models/room.model');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyHost = require('../middlewares/verifyHost');

// admin statistics
router.get('/admin-stat', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookingsDetails = await BookingsCollection.find(
      {},
      { createdAt: 1, price: 1 }
    ).lean();
    const totalUsers = await UsersCollection.countDocuments();
    const totalRooms = await RoomsCollection.countDocuments();
    const totalSales = bookingsDetails.reduce((sum, booking) => sum + booking.price, 0);

    const chartData = bookingsDetails.map(booking => {
      const day = new Date(booking.createdAt).getDate();
      const month = new Date(booking.createdAt).getMonth() + 1;
      const data = [`${day}/${month}`, booking?.price];
      return data;
    });

    chartData.unshift(['Day', 'Sales']);

    console.log(chartData);

    res.status(200).json({
      totalUsers,
      totalRooms,
      totalBookings: bookingsDetails.length,
      totalSales,
      chartData
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

// host statistics
router.get('/host-stat', verifyToken, verifyHost, async (req, res) => {
  try {
    const email = req.user.email;
    const bookingsDetails = await BookingsCollection.find(
      { 'host.email': email },
      { createdAt: 1, price: 1 }
    ).lean();
    const { createdAt } = await UsersCollection.findOne({ email }, { createdAt: 1 });
    const totalRooms = await RoomsCollection.countDocuments({ 'host.email': email });
    const totalSales = bookingsDetails.reduce((sum, booking) => sum + booking.price, 0);

    const chartData = bookingsDetails.map(booking => {
      const day = new Date(booking.createdAt).getDate();
      const month = new Date(booking.createdAt).getMonth() + 1;
      const data = [`${day}/${month}`, booking?.price];
      return data;
    });

    chartData.unshift(['Day', 'Sales']);

    // console.log(chartData);

    res.status(200).json({
      hostSince: createdAt,
      totalBookings: bookingsDetails.length,
      totalRooms,
      totalSales,
      chartData,
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

// host statistics
router.get('/guest-stat', verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const bookingsDetails = await BookingsCollection.find(
      { 'guest.email': email },
      { createdAt: 1, price: 1 }
    ).lean();
    const { createdAt } = await UsersCollection.findOne({ email }, { createdAt: 1 });
    const totalCosts = bookingsDetails.reduce((sum, booking) => sum + booking.price, 0);

    const chartData = bookingsDetails.map(booking => {
      const day = new Date(booking.createdAt).getDate();
      const month = new Date(booking.createdAt).getMonth() + 1;
      const data = [`${day}/${month}`, booking?.price];
      return data;
    });

    chartData.unshift(['Day', 'Sales']);

    // console.log(chartData);

    res.status(200).json({
      guestSince: createdAt,
      totalBookings: bookingsDetails.length,
      totalCosts,
      chartData,
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

module.exports = router;