// @note based on tutorial https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49

import { Router } from 'express';
import bcrypt from 'bcrypt';

import { dbQuery } from '../db.js';

const router = Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Register a User
// In Rest that means post a new User
router.post('/', async function (req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await dbQuery('INSERT INTO users (username, password) VALUES (?,?)', [username, hashedPassword]);
  res.json({ message: "user registered", result });
});

export default router;
