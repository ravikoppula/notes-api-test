const mongoose = require("mongoose");
const commonSchema = require("./commonSchema");

const NoteSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: false }, // Reference to Folder
  
  title: { type: String, required: true },

  content: { type: String, required: true },

  tags: { type: [String], default: [] }, 
  
  isPinned: { type: Boolean, default: false },

  isArchived: { type: Boolean, default: false },

  isDeleted: { type: Boolean, default: false },

  color: { type: String, default: "#ffffff" }, 
  
  attachments: { type: [String], default: [] }, 
  
  reminderAt: { type: Date, default: null },
  
  sharedWith: [{ type: String }], 
  
  ...commonSchema.timestamps
  
});

NoteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model("Note", NoteSchema);
