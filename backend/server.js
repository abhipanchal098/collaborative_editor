require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);

const initializeSocket = require('./socket.io'); // Import socket file
initializeSocket(server); // Initialize socket with server

const port = process.env.PORT || 5005;

// Apply CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { message: "Too many requests, please try again later." },
    headers: true, // Send rate limit headers
});

app.use(limiter); // Apply rate limiting to all routes

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(`/api/auth`, require(`./routes/auth`));
app.use(`/api/documents`, require(`./routes/documents`));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
