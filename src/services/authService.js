const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = async (userData) => {
    const user = await User.create(userData);
    return user;
};

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error('Incorrect username or password');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
};
