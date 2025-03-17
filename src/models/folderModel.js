const mongoose = require("mongoose");
const commonSchema = require("./commonSchema");

const FolderSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  
  name: { type: String, required: true },
  
  ...commonSchema.timestamps

});

module.exports = mongoose.model("Folder", FolderSchema);
