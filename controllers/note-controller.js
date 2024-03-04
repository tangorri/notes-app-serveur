import { dbQuery } from '../db.js';

export class NoteController {
  async listAll(req, res) {
    console.log('noteController should list them all');
    const [results, fields] = await dbQuery('SELECT * FROM notes');
    res.send(results);
  }

  async create(req, res) {
    const newNote = {
      text: req.body.text
    };
    console.log('noteController create with text : ', newNote.text);
    const [results, fields] = await dbQuery('INSERT INTO notes (text) VALUE (?)', [newNote.text]);
    res.json({message: "note added", results: results});
  }

  async update(req, res) {
    const [results] = await dbQuery('UPDATE notes SET text = ? WHERE id= ?', [req.body.text, req.params.id]);
    res.json({ message: "note updated", results: results});
  }

  async destroy(req, res) {
    const [results, fields] = await dbQuery('DELETE FROM notes WHERE id = ?', [req.params.id]);
    res.json({message: "note deleted",  results: results});
  }
}
