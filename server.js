require('./models');

const express = require('express');

const app = express();
app.use(express.json());

app.get('/', async (request, response) => {
  response.send('ok');
});

app.post('/api/register', async (request, response) => {
  const { username, password } = request.body;
  response.send('register');
});

app.listen(3000, () => {
  console.log('app listening on 3000');
});
