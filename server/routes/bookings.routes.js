const express = require('express');
const router = express.Router();
const BookingsCollection = require('../models/bookings.model');
const RoomsCollection = require('../models/room.model');
const verifyToken = require('../middlewares/verifyToken');

// get the specific booking data using the email
router.get('/:email', verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const decodedEmail = req.user.email;

    if (email !== decodedEmail) {
      return res.status(403).json({ message: 'Forbidden access' })
    }
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
});

// create a booking data in db
router.post('/book', verifyToken, async (req, res) => {
  try {
    const paymentInfo = req.body;
    // console.log(paymentInfo);

    const result = await BookingsCollection.create(paymentInfo);

    // update the status


    res.status(201).json({
      success: true,
      createdData: result
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: `Error save to booking data: ${err.message}`
    })
  }
});

// delete booking data
router.delete('/book/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await BookingsCollection.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: 'Successfully deleted the booking info',
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