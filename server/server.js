require('newrelic');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const db = require('../database/index.js');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/restaurants', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', function getFile (req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.get('/api/restaurants/:id', function getRestaurant (req, res) {
  let id = req.params.id;
  db.findOne(id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('ERROR: ', err);
  });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
