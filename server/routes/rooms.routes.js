const express = require('express');
const router = express.Router();
const RoomsCollection = require('../models/room.model');

// get all room data 
router.get('/rooms', async (req, res) => {
  try {
    const category = req.query.category;
    // console.log(category);

    let query = {};
    if (category && category !== 'null') query = { category }

    const rooms = await RoomsCollection.find(query).lean();
    res.status(200).json({
      success: true,
      data: rooms || []
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Error getting all rooms data: ${err.message}`
    })
  }
})

// get a single room data
router.get('/room/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(_id);
    
    const roomData = await RoomsCollection.findById(_id);
    res.status(200).json({
      success: true,
      data: roomData
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Error getting single room data: ${err.message}`
    })
  }
})

module.exports = router;