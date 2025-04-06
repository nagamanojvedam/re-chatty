const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const connectDB = require('./lib/mongodb');

const authRouter = require('./routes/authRoutes')
const messageRouter = require('./routes/messageRoutes')

const {app, server} = require('./lib/socket')

dotenv.config({'path': './config.env'});

// const __dirname = path.resolve();

app.use(express.json({limit: '10mb'}))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', messageRouter)

server.listen(process.env.PORT, () => {
  console.log(`Express server running on PORT: ${process.env.PORT}`);
  connectDB();
})