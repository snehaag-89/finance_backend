const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
app.use(express.json()); 
app.use(cors());

const authRoutes = require('./backend/routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/records', require('./backend/routes/record'));
app.use('/api/dashboard', require('./backend/routes/dashboard'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error:', err));
app.get('/', (req, res) => {
  res.send('Finance Dashboard server is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});