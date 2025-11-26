const express = require('express');
const router = express.Router();
const RoomsCollection = require('../models/room.model');
const { getAllRooms, getSingleRoom, getAllRoomsForHost, createRoom, deleteRoom, updateRoomStatus } = require('../controllers/rooms.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyHost = require('../middlewares/verifyHost');

// get all room data 
router.get('/rooms', getAllRooms);

// get a single room data
router.get('/room/:id', getSingleRoom);

// get all rooms for host using email
router.get('/rooms/my-listings/:email', verifyToken, verifyHost, getAllRoomsForHost);

// create a room data
router.post('/room', verifyToken, verifyHost, createRoom);

// update the room data
router.put('/rooms/update-room/:id', async (req, res) => {
  try {
    const _id = req.params.id;

    const updatedRoomData = req.body;
    
    const result = await RoomsCollection.findByIdAndUpdate(_id, updatedRoomData);
    res.status(200).json({
      success: true,
      message: `Successfully updated the ${result.title}`,
      data: result
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// update the room book status
router.patch('/room/status/:id', updateRoomStatus);

// delete a room data using id
router.delete('/room/:id', verifyToken, verifyHost, deleteRoom);

module.exports = router;