const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Example protected route
router.post('/upload', authenticateToken, (req, res) => {
    // Handle file upload and other logic here
    res.status(200).json({ message: 'File uploaded successfully' });
});

module.exports = router;
