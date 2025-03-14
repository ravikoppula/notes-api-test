const Note = require('../models/noteModel');

exports.getNotes = async (userId) => {
    return await Note.find({ owner: userId });
};

exports.getNoteById = async (userId, noteId) => {
    return await Note.findOne({ _id: noteId, owner: userId });
};

exports.createNote = async (userId, noteData) => {
    noteData.owner = userId;
    return await Note.create(noteData);
};

exports.updateNote = async (userId, noteId, noteData) => {
    const note = await Note.findOneAndUpdate({ _id: noteId, owner: userId }, noteData, { new: true });
    if (!note) throw new Error('Note not found');
    return note;
};

exports.deleteNote = async (userId, noteId) => {
    await Note.findOneAndDelete({ _id: noteId, owner: userId });
};

exports.shareNote = async (userId, noteId, sharedWith) => {
    const note = await Note.findOne({ _id: noteId, owner: userId });
    if (!note) throw new Error('Note not found');
    note.sharedWith.push(sharedWith);
    await note.save();
    return note;
};

exports.searchNotes = async (userId, query) => {
    return await Note.find({ owner: userId, $text: { $search: query } });
};
