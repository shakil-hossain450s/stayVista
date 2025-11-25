const express = require('express');
const router = express.Router();
const BookingsCollection = require('../models/bookings.model');
const RoomsCollection = require('../models/room.model');

// get the specific booking data using the email
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    // query
    const query = { 'guest.email': email }

    const bookings = await BookingsCollection.find(query).lean();
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.post('/book', async (req, res) => {
  try {
    const paymentInfo = req.body;
    console.log(paymentInfo);

    const result = await BookingsCollection.create(paymentInfo);

    // update the status
    const query = { _id: paymentInfo.roomId };
    const updatedDoc = {
      $set: { booked: true }
    }
    const updatedRoom = await RoomsCollection.findOneAndUpdate(query, updatedDoc);

    res.status(201).json({
      success: true,
      createdData: result,
      updatedRoom
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: `Error save to booking data: ${err.message}`
    })
  }
})

module.exports = router;