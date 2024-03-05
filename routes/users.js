import bcrypt from 'bcrypt';
import { Router } from 'express';
var router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res){
    //const username = req.body.username;
    //const password = req.body.password;
    console.log('register new user');
    const {username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const [result] = await dbQuery("INSERT INTO users(username, password) VALUES(?, ?)", [username,hashedPassword]);
    res.json({message: "user created", result})
});

export default router;
