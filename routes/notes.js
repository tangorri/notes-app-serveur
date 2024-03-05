import verifyToken from '../middleware/auth-middleware.js';

import { NoteController } from '../controllers/note-controller.js';
import { Router } from 'express';
const router = Router();

const noteController = new NoteController();

/* GET notes listing. */
router.get('/', verifyToken, function(req, res, next) {
  noteController.listAll(req, res);
});

//  create a new note
router.post('/', function(req, res) {
  console.log('red body from router: ', req.body);
  noteController.create(req, res);
});

// update a note
router.put('/:id', (req, res) => noteController.update(req, res));

// delete a note
router.delete('/:id', function(req, res) {
  console.log('access to delete action with id: ', req.params.id );
  noteController.destroy(req, res);
});

export default router;

