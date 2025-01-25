// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // MongoDB Connection
// const mongoUri = process.env.MONGO_URI;

// if (!mongoUri) {
//   console.error('Error: MONGO_URI is not defined in the .env file.');
//   process.exit(1); // Exit process with failure
// }

// console.log(`MongoDB URI: ${mongoUri}`);

// mongoose
//   .connect(mongoUri)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit process with failure
//   });

// // Middleware
// app.use(express.json());

// // Routes (example route)
// app.get('/', (req, res) => {
//   res.send('Server is up and running!');
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB URI and connection setup
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('Error: MONGO_URI is not defined in the .env file.');
  process.exit(1); // Exit process with failure
}

console.log(`MongoDB URI: ${mongoUri}`);

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes setup
app.use('/api/auth', require('./routes/auth')); // authentication routes

// Default route (you can test if the server is up)
app.get('/', (req, res) => res.send('API is running'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
