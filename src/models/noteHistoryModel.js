const mongoose = require("mongoose");
const commonSchema = require("./commonSchema");

const NoteHistorySchema = new mongoose.Schema({
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true }, // Reference to Note
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] }, // Array of tags
  isPinned: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  color: { type: String, default: "#ffffff" }, // Default white
  attachments: { type: [String], default: [] }, // Array of file URLs
  reminderAt: { type: Date, default: null }, // Optional reminder
  sharedWith: [{ type: String }], // Array of emails
  ...commonSchema.timestamps
});

module.exports = mongoose.model("NoteHistory", NoteHistorySchema);
