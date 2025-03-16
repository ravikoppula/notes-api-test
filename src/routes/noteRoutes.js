const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get a list of all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *       401:
 *         description: Unauthorized
 */
router.get('/', noteController.getNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.get('/:id', noteController.getNoteById);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', noteController.createNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update an existing note by ID for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.put('/:id', noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by ID for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     responses:
 *       204:
 *         description: Note deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.delete('/:id', noteController.deleteNote);

/**
 * @swagger
 * /notes/{id}/share:
 *   post:
 *     summary: Share a note with another user for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sharedWith:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note shared successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.post('/:id/share', noteController.shareNote);

/**
 * @swagger
 * /notes/search/{userId}:
 *   get:
 *     summary: Search for notes based on keywords for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of notes matching the search query
 *       401:
 *         description: Unauthorized
 */
router.get('/search/:userId', noteController.searchNotes);

module.exports = router;
