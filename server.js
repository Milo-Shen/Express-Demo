const express = require('express');

const app = express();

app.get('/', async (response, request) => {
  request.send('ok');
});

app.listen(3000, () => {
  console.log('app listening on 3000');
});
