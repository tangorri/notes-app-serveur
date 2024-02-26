import mysql from 'mysql2/promise';

export class NoteController {
  async listAll(req, res) {
    console.log('noteController should list them all');
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'notes_app'
    });
    console.log('connexion db réussie');
    const [results, fields] = await dbConnection.query('SELECT * FROM notes');
    res.send(results);
  }

  async create(req, res) {
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'notes_app'
    });

    const newNote = {
      text: req.body.text
    };

    console.log('noteController create with text : ', newNote.text);
    const [results, fields] = await dbConnection.query('INSERT INTO notes (text) VALUE (?)', [newNote.text]);
    res.json({message: "note added to"});
  }

  async destroy(req, res) {
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'notes_app'
    });
    const [results, fields] = await dbConnection.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    res.json({message: "note deleted",  results: results});
  }
}
