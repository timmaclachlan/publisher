"use strict";

var _express = require("express");

var _authors = require("../controllers/authors");

var router = (0, _express.Router)();
router.get('/', _authors.getAll);
router.get('/lookup/', _authors.getAllLookup);
router.get('/:id', _authors.getById);
router.post('/', _authors.create);
router.patch('/:id', _authors.updateById);
router.delete('/:id', _authors.deleteById);
module.exports = router;