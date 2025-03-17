const Note = require('../models/noteModel');
const NoteHistory = require('../models/noteHistoryModel');
const User = require('../models/userModel');

exports.getNotes = async (userId) => {

    return await Note.find({ userId });
};

exports.getNoteById = async (userId, noteId) => {

    return await Note.findOne({ _id: noteId, userId });
};

exports.createNote = async (userId, noteData) => {

    noteData.userId = userId;
    return await Note.create(noteData);
};

exports.updateNote = async (userId, noteId, noteData) => {

    const note = await Note.findOneAndUpdate({ _id: noteId, userId }, noteData, { new: true });
    if (!note) throw new Error('Note not found');
    const noteHistoryData = { ...note.toObject(), noteId: note._id };

    delete noteHistoryData._id;  

    await NoteHistory.create(noteHistoryData);
    return note;
};

exports.deleteNote = async (userId, noteId) => {

    await Note.findOneAndDelete({ _id: noteId, userId });
};

exports.shareNote = async (userId, noteId, sharedWith) => {

    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) throw new Error('Note not found');
    if (!note.sharedWith.includes(sharedWith)) {

        note.sharedWith.push(sharedWith);

    }

    await note.save();
    return note;

};
  
exports.searchNotes = async (userId, query = '') => {

    try {

        let notes;

        if (!query) {
            
            notes = await Note.find({ userId: userId });

        } else {
            
            notes = await Note.find({

                userId: userId,

                $or: [

                    { title: { $regex: query, $options: 'i' } },

                    { content: { $regex: query, $options: 'i' } }

                ]

            });

        }

        return notes;

    } 
    catch (error) 
    {
        throw error;
    }

};

 