// @note based on tutorial https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49

import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await dbQuery('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];
    console.log('login, user: ', user);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    // const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
