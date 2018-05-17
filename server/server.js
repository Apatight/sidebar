const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient();

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
});

app.get('/api/restaurants/:id', function getRestaurant (req, res) {
  let id = req.params.id;
  client.get(id, (err, restaurant) => {
    if (restaurant) {
      res.send(restaurant);
    }
    else {
      db.findOne(id)
      .then((data) => {
        client.setex(id, 3600, JSON.stringify(data))
        res.send(data);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
    }
  }); 
});

//Redis

// const getCache = (req, res) => {
//   let id = req.params.id;
//   client.get(id, (err, restaurant) => {
//     if (restaurant) {
//       res.send(restaurant);
//     } else {
//         app.get('/api/restaurants/:id', function getRestaurant (req, res) {
//         let id = req.params.id;
//         console.log('id is', id);
//         db.findOne(id)
//         .then((data) => {
//           let restaurant = data;
//           client.setex(id, 3600, JSON.stringify(data));

//           res.send(data);
//         })
//         .catch((err) => {
//           console.log('ERROR: ', err);
//         });
//       });
//     }
//   });
// }

// app.get('/api/restaurants/:id', getCache);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});