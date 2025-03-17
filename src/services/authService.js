const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// exports.signup = async (userData) => {
//     if (!userData.username || !userData.email || !userData.password) {
//         throw new Error('Username, email, and password are required');
//     }
//     const hashedPassword = await bcrypt.hash(userData.password, 12);
//     userData.passwordHash = hashedPassword;
//     delete userData.password; // Remove the plain password from the userData object
//     const user = await User.create(userData);

//     console.log('User:', user); 

//     return user;
// };


exports.signup = async (userData) => {
    if (!userData.username || !userData.email || !userData.password) {
        throw new Error('Username, email, and password are required');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    userData.passwordHash = hashedPassword;
    delete userData.password; // Remove the plain password from the userData object
    const user = await User.create(userData);

    return user;
};


// exports.login = async (username, password) => {

//     if (typeof username !== 'string' || typeof password !== 'string') {
//         throw new Error('Invalid username or password format');
//     }

//     console.log('Username:', username);
//     console.log('Password:', password);

//     const user = await User.findOne({ username });

//     if (!user || !(await user.comparePassword(password))) {

//         throw new Error('Invalid username or password');
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        
//         expiresIn: '1h'  
//     });

//     return { token };
// };


exports.login = async (username, password) => {

    if (typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('Invalid username or password format');
    }

    // console.log('Username:', username);
    // console.log('Password:', password);

    const user = await User.findOne({ username });

    if (!user || !(await user.correctPassword(password, user.passwordHash))) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'  
    });

    return { token };
};
