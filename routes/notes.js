import mysql from 'mysql2/promise';
import { NoteController } from '../controllers/note-controller.js';
import { Router } from 'express';
var router = Router();

const noteController = new NoteController();

/* GET notes listing. */
router.get('/', function(req, res, next) {
  noteController.listAll(req, res);
});

//  create a new note
router.post('/', function(req, res) {
  console.log('red body from router: ', req.body);
  noteController.create(req, res);
});

// delete a note
router.delete('/:id', function(req, res) {
  console.log('access to delete action with id: ', req.params.id );
  noteController.destroy(req, res);
});

export default router;

