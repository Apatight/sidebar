const mongoose = require('mongoose');
// const newrelic = require('newrelic');
// const mongoUrlDocker = 'mongodb://database/apateez-sidebar';
const mongoUrl = 'mongodb://localhost/apatight-sidebar';

mongoose.connect(mongoUrl);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open')
});
  
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
mongoose.connect(mongoUrl)
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {} ); // connected

const placesSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  menu_url: String,
  address: String,
  location: String,
  url: String,
  phone: String,
  hours: [],
  lat: String,
  lng: String
  });

const Places = mongoose.model('Places', placesSchema);

const clearDb = (cb) => {
  Places.remove({}, cb)
}

// const findOne = (id, cb) => {
//   Places.findOne( {id: id}), 'id', (err, place) => {
//     if (err) console.log(err);
//     else cb(place);
//   }
// }
const findOne = id => Places.findOne({"id": id});


// module.exports.places = Places;
// module.exports.db = db;
// module.exports.findOne = findOne;
// exports.clearDb = clearDb;
module.exports = {
  findOne
};