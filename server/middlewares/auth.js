const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // D. Debugging Code
    /*
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('ALL env variables:', process.env);
    */
   
    // 0. Extract token from headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    

    // 1. Validate Input
    if (!token) {
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    // 2. Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined in environment variables');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    // 3. Verify token
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request object
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateToken;