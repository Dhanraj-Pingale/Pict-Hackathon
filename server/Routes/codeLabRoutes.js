import { Router } from 'express';
import {
  createCodelab,
  getCodelabs,
  getCodelabById,
  updateCodelab,
  deleteCodelab,
} from '../Controllers/codeLabController.js';

const router = Router();

// Route to create a new codelab
router.post('/create', createCodelab);

// Route to get all codelabs
router.get('/', getCodelabs);

// Route to get a specific codelab by ID
router.get('/:id', getCodelabById);

// Route to update a specific codelab by ID
router.put('/:id', updateCodelab);

// Route to delete a specific codelab by ID
router.delete('/:id', deleteCodelab);

export default router;
