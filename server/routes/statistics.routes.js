const express = require('express');
const router = express.Router();

const BookingsCollection = require('../models/booking.model');
const UsersCollection = require('../models/user.model');
const RoomsCollection = require('../models/room.model');

router.get('/admin-stat', async (req, res) => {
  try {
    const bookingsDetails = await BookingsCollection.find(
      {},
      { createdAt: 1, price: 1 }
    ).lean();
    const totalUsers = await UsersCollection.countDocuments();
    const totalRooms = await RoomsCollection.countDocuments();
    const totalPrice = bookingsDetails.reduce((sum, booking) => sum + booking.price, 0);

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
      totalPrice, 
      chartData
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