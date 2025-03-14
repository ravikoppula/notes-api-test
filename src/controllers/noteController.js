const noteService = require('../services/noteService');

exports.getNotes = async (req, res, next) => {
    try {
        const notes = await noteService.getNotes(req.user.id);
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

exports.getNoteById = async (req, res, next) => {
    try {
        const note = await noteService.getNoteById(req.user.id, req.params.id);
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

exports.createNote = async (req, res, next) => {
    try {
        const note = await noteService.createNote(req.user.id, req.body);
        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
};

exports.updateNote = async (req, res, next) => {
    try {
        const note = await noteService.updateNote(req.user.id, req.params.id, req.body);
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

exports.deleteNote = async (req, res, next) => {
    try {
        await noteService.deleteNote(req.user.id, req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

exports.shareNote = async (req, res, next) => {
    try {
        await noteService.shareNote(req.user.id, req.params.id, req.body.sharedWith);
        res.status(200).json({ message: 'Note shared successfully' });
    } catch (error) {
        next(error);
    }
};

exports.searchNotes = async (req, res, next) => {
    try {
        const notes = await noteService.searchNotes(req.user.id, req.query.q);
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};
