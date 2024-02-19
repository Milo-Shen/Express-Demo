const express = require('express');

const app = express();

app.get('/', async (request, response) => {
  response.send('ok');
});

app.post('/api/register', async (request, response) => {
  response.send('ok');
});

app.listen(3000, () => {
  console.log('app listening on 3000');
});
