const mongoose = require("mongoose");
const commonSchema = require("./commonSchema");

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: false }, // Reference to Folder
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

NoteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model("Note", NoteSchema);
