const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        token = req.headers.authorization.split(' ')[1];

    }

    if (!token) {

        return res.status(401).json({ message: 'You are not logged in!' });

    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {

        return res.status(401).json({ message: 'The user belonging to this token does no longer exist.' });
    
    }

    req.user = currentUser;
    req.userId = decoded.id;

    next();
    
};
