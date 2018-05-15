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
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/restaurants', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.get('/api/restaurants/:id', function(req, res) {
  let id = req.params.id;
  console.log('id is', typeof id);
  db.findOne(id)
  .then((data) => {
    console.log(data);
    res.send(data);
  })
  .catch((err) => {
    console.log('ERROR: ', err);
  });
  // places.findOne({"id": id}, (err, person) => {
  //   console.log(err, person);
  //   res.send(person);
  // });
  // let q = places.findOne({"id": id});
  // console.log('Get request for restaurant id sent');
  // q.select('*');
  // q.exec((err, place) => {
  //   if (err) { console.log(err) }
  //   console.log('PLACE: ', place)
  //   res.send(place);
  // });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
