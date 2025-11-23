require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/connectDB')

const authRoutes = require('./routes/auth.routes');
const roomsRoutes = require('./routes/rooms.routes');
const usersRoutes = require('./routes/users.routes');


// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// database connection
connectDB();

// default entry point route
app.get('/', (req, res) => {
  res.send('StayVista Server is cooking..')
})

// auth routes
app.use('/api/auth', authRoutes);
// rooms routes
app.use('/api', roomsRoutes);
// users routes
app.use('/api', usersRoutes);

module.exports = app;
