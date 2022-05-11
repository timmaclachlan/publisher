"use strict";

var _express = require("express");

var _books = require("../controllers/books");

var router = (0, _express.Router)();
router.get('/', _books.getAll);
router.get('/lookup/', _books.getAllLookup);
router.get('/:id', _books.getById);
router.post('/', _books.create);
router.patch('/:id', _books.updateById);
router.delete('/:id', _books.deleteById);
module.exports = router;