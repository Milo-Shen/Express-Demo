require('./models');

const express = require('express');
const bcrypt = require('bcrypt');

const { User } = require('./models');
const app = express();
app.use(express.json());

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

  response.send({
    token: 'fake token',
    message: user,
  });
});

app.get('/api/users', async (request, response) => {
  let users = await User.find();
  response.send(users);
});

app.listen(3000, () => {
  console.log('app listening on 3000');
});
