import express, { json, urlencoded } from 'express';
// var cors = require('cors');
import cors from 'cors';
import bodyParser from 'body-parser';



// importation du code des sous routeurs
import notesRouter from './routes/notes.js';

var app = express();

// app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(json());

// Initialisation du Router
app.use('/notes', notesRouter);
app.use('/', (req, res) => res.send('et oui on vous souhaite la bienvenue!'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(3000, () => console.log("Serveur API démarré"));
