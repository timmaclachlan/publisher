import { Router } from "express";
import { getAll, getAllLookup, getById, create, updateById, deleteById } from "../controllers/authors";

const router = Router();

router.get('/', getAll);
router.get('/lookup/', getAllLookup);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;
 
