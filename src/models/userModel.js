const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const commonSchema = require("./commonSchema");

const UserSchema = new mongoose.Schema({

  username: { type: String, required: true, unique: true },

  email: { type: String, required: true, unique: true },

  passwordHash: { type: String, required: true }, // Store hashed password

  profilePicture: { type: String, default: "" },

  ...commonSchema.timestamps

  
});

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", UserSchema);
