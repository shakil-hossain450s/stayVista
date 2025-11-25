const express = require('express');
const router = express.Router();
const BookingsCollection = require('../models/bookings.model');
const RoomsCollection = require('../models/room.model');

router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;
    console.log(bookingData);

    const result = await BookingsCollection.create(bookingData);

    // update the status
    const query = { _id: bookingData.roomId };
    const updatedDoc = {
      $set: { booked: true }
    }
    const updatedRoom = await RoomsCollection.updateOne(query, updatedDoc);

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