const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static('public'));

app.get('/api/v1/items', (request, response) => {
  database('items').select()

  .then(items => response.status(200).json(items))
  .catch(error => reponse.status(500).json({ error }))
})

app.post('/api/v1/items', (request, response) => {
  const item = request.body;

  if(!item.item) {
    return response.status(422)
    .send({ error: 'missing item'})
  }

  database('items').insert(item, '*')
    .then(item => response.status(201).json(Object.assign({}, item[0], {not_packed: true} )))
    .catch(error => response.status(500).json({ error }))
})

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`);
});

module.exports = app;
