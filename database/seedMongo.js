const millionData = require('.zagatData.json');
const Places = require('./index.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/apatight-sidebar');
mongoose.connection.on('connected', function() {
	console.log('Mongoose connection open')
});

mongoose.connection.on('error', function (err) {
	console.log('Mongoose default connection error:', err);
})

var seedMongo = (places) => {
	let counter = 0;

	var createList = (array) => {
		var obj = {
			id: array[counter].result.place_id,
      name: places[counter].result.name,
      menu_url: 'http://google.com',
      address: places[counter].result.formatted_address,
      location: places[counter].result.url,
      url: places[counter].result.website,
      phone: places[counter].result.international_phone_number,
      hours: places[counter].result.opening_hours ? places[counter].result.opening_hours.weekday_text : null,
      coords: {
        lat: places[counter].result.geometry.location.lat,
        lng: places[counter].result.geometry.location.lng
      }
		}
	}
}
