const express = require('express');

const router = express.Router();
const bookController = require('../controllers/books');

router.get('/books', bookController.getAll);
router.get('/books/lookup/', bookController.getAllLookup);
router.get('/books/:id', bookController.getById);
router.post('/books', bookController.create);
router.patch('/books/:id', bookController.updateById);
router.delete('/books/:id', bookController.deleteById);

module.exports = router;