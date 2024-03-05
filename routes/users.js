import { Router } from 'express';
import { dbQuery } from '../db.js';

const router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res) {
  console.log('register new user');
  const {username, password } = req.body;
  const [result] = await dbQuery("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
  res.json({message: "user created", result });
});

export default router;
