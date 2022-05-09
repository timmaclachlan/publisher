const express = require('express');

const router = express.Router();
const authorController = require('../controllers/authors');

router.get('/authors', authorController.getAll);
router.get('/authors/lookup/', authorController.getAllLookup);
router.get('/authors/:id', authorController.getById);
router.post('/authors', authorController.create);
router.patch('/authors/:id', authorController.updateById);
router.delete('/authors/:id', authorController.deleteById);

module.exports = router;
 
