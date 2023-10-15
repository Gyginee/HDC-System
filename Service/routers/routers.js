const express = require('express');
const userRouter = require('./routes/user'); // Import router for user

const router = express.Router();

// Add other routers here
router.use('/user', userRouter);

module.exports = router;
