const mongoose = require('mongoose');
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
      type: String,
      unique: true
    },
    name: String,
    menu_url: String,
    address: String,
    location: String,
    url: String,
    phone: String,
    hours: [],
    coords: {
      lat: String,
      lng: String
    }
  });

const Places = mongoose.model('Places', placesSchema);

const clearDb = (cb) => {
  Places.remove({}, cb)
}

module.exports.Places = Places;
module.exports.db = db;
exports.clearDb = clearDb;
