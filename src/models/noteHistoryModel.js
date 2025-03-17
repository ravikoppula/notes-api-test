const mongoose = require("mongoose");
const commonSchema = require("./commonSchema");

const NoteHistorySchema = new mongoose.Schema({


  noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true }, // Reference to Note
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  
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

module.exports = mongoose.model("NoteHistory", NoteHistorySchema);
