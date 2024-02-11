// index.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const port = 4000;

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_DB_URL}`);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/pages', require('./routes/pageRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));


// API's
app.get('/', (req, res) => {
    res.json({
          success: true,
          message: "Welcome to the API"
      })
})

// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong');
    }
    console.log(`Server running on port ${port}`);
});