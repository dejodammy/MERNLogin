const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');


// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/organisations', require('./routes/organisationRoutes'));

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));