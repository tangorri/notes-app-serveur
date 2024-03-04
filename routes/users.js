import { Router } from 'express';
var router = Router();

import { dbQuery } from '../db.js';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res) {
  const { username, password } = req.body;
  const result = await dbQuery('INSERT INTO users (username, password) VALUES (?,?)', [username, password]);
  res.json({message: "user registered", result });
});

export default router;
