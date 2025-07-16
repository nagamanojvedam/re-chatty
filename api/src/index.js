const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')

const connectDB = require('./lib/mongodb');

const authRouter = require('./routes/authRoutes')
const messageRouter = require('./routes/messageRoutes')

const {app, server} = require('./lib/socket')

dotenv.config();

// Middleware
app.use(express.json({limit: '10mb'}))
app.use(cookieParser())

// CORS
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))
  app.use(morgan('dev'))
}

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', messageRouter)

// Static files for production
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.resolve(__dirname, '../ui/dist')
  
  app.use(express.static(clientPath))
  app.get('*', (req, res) => {
    res.sendFile(clientPath, 'index.html')
  })
}

// Start the server
(async () => {
  try {
    await connectDB();
    server.listen(process.env.PORT, () => 
    console.log(`✨ Express server running on PORT: ${process.env.PORT}`)
);
  }catch(err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
})()

