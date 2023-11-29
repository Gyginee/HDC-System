const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve HTML file when accessing the home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve script.js file
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Your API routes go here

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
