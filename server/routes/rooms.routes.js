const express = require('express');
const router = express.Router();
const RoomsCollection = require('../models/room.model');
const { getAllRooms, getSingleRoom, getAllRoomsForHost, createRoom, deleteRoom } = require('../controllers/rooms.controller');
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

// delete a room data using id
router.delete('/room/:id', verifyToken, verifyHost, deleteRoom);

module.exports = router;