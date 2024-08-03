// Import Mongoose Models
require('./models');

// Import Express
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('./models');
const app = express();
app.use(express.json());

const SALT = process.env.salt;

const auth = async (request, response, next) => {
  const token = request.headers.authorization.split(' ')[1];
  try {
    const { id } = jwt.verify(token, SALT);
    console.log(id);
    request.user = User.findById(id);
  } catch (e) {
    console.log(e);
    request.user = 'none';
  }
  next();
};

app.get('/', async (request, response) => {
  response.send('ok');
});

app.post('/api/register', async (request, response) => {
  const { username, password } = request.body;
  let user = null;

  try {
    user = await User.create({
      username: username,
      password: password,
    });
  } catch (e) {
    console.error(e);
    response.send('failed');
  }

  response.send(user);
});

app.post('/api/login', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    response.status(422).send({
      message: 'user not found',
    });
  }

  const is_password_valid = bcrypt.compareSync(password, user.password);

  if (!is_password_valid) {
    return response.status(422).send({
      message: 'password is invalid',
    });
  }

  // expiresIn: 120
  response.send({
    token: jwt.sign(
      {
        id: String(user._id),
        exp: Math.floor(Date.now() / 1000) + 15,
      },
      SALT,
    ),
    message: user,
  });
});

app.get('/api/users', async (request, response) => {
  let users = await User.find();
  response.send(users);
});

app.get('/api/profile', auth, async (request, response) => {
  response.send('request.user');
});

app.listen(3000, () => {
  console.log('app listening on 3000');
});
