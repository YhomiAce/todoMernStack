const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');

const app = express();
connectDB();

// Init middleware
app.use(express.json({extend: false}));
app.use(cors())

app.get('/', ( req, res ) => res.send('Api running'));

// Define route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/todo', require('./routes/api/todo'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on Port: ${PORT}`));