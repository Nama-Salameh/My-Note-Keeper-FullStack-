const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/', noteController.getAllNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNoteById);
router.delete('/:id', noteController.deleteNoteById);

module.exports = router;
