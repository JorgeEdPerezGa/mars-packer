const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`);
});

module.exports = app;
