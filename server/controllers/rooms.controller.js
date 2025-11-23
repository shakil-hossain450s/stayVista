const RoomsCollection = require('../models/room.model');

// get all rooms data
const getAllRooms = async (req, res) => {
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
}

// get a single room data
const getSingleRoom = async (req, res) => {
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
}

// get all rooms for host using email
const getAllRoomsForHost = async (req, res) => {
  try {
    const email = req.params.email;
    const query = { 'host.email': email }
    const rooms = await RoomsCollection.find(query).sort({ createdAt: -1 }).lean();
    res.status(200).json({
      success: true,
      data: rooms
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Error create room in DB: ${err.message}`
    })
  }
}

// create a room data
const createRoom = async (req, res) => {
  try {
    const roomData = req.body;
    const result = await RoomsCollection.create(roomData);
    res.status(201).json({
      success: true,
      result
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Error create room in DB: ${err.message}`
    })
  }
}

// delete a room using id
const deleteRoom = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(_id);
    const result = await RoomsCollection.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      result
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: `Error Deleting room data: ${err.message}`
    })
  }
}

module.exports = { getAllRooms, getSingleRoom, getAllRoomsForHost, createRoom, deleteRoom };