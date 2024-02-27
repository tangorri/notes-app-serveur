import mysql from 'mysql2/promise';

const dbConnection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
console.log('connexion db réussie');

export class NoteController {
  async listAll(req, res) {
    console.log('noteController should list them all');
    const [results, fields] = await dbConnection.query('SELECT * FROM notes');
    res.send(results);
  }

  async create(req, res) {
    const newNote = {
      text: req.body.text
    };
    console.log('noteController create with text : ', newNote.text);
    const [results, fields] = await dbConnection.query('INSERT INTO notes (text) VALUE (?)', [newNote.text]);
    res.json({message: "note added", results: results});
  }

  async update(req, res) {
    const [results] = await dbConnection.query('UPDATE notes SET text = ? WHERE id= ?', [req.body.text, req.params.id]);
    res.json({ message: "note updated", results: results});
  }

  async destroy(req, res) {
    const [results, fields] = await dbConnection.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    res.json({message: "note deleted",  results: results});
  }
}
