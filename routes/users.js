import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Router } from 'express';
import { dbQuery } from '../db.js';

const router = Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res) {
  console.log('register new user');
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await dbQuery(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  res.json({ message: "user created", result });
});

router.post('/login', async function (req, res) {
  const { username, password } = req.body;
  // rechercher le user
  const [users] = await dbQuery(
    "SELECT * FROM users WHERE username = ?", [username]
  );
  const user = users[0];

  if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ message: 'ok', token: token });
  // res.json({message: 'ok', token});
});

export default router;
