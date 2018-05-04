// const request = require('request');
const initData = require('./195-Zagat-AllData.json');
// const rp = require('request-promise')
// const fs = require('fs');
const faker = require('faker');
const Places = require('./index.js');
const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.connect('mongodb://database/apateez-sidebar');


getFullData = (places) => {
  let counter = 0;
  // Promise.map(places, function(place) {
  //     var options = {
  //         uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.result.place_id}&key=AIzaSyDkBAx39pJ0ccyXA-TWN-FmevHc87mznAM`,
  //         headers: {
  //             'User-Agent': 'Request-Promise'
  //       },
  //       json: true
  //   }
    // return rp(options)
    //   .then((data) => {
      console.log('GET FULL DATA CALLED')
  let seedData = () => {
    let temp = {
      id: places[counter].result.place_id,
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
    };
    console.log(temp)

    Places.create(temp, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        counter++;
        if (counter < places.length) {
          seedData();
        } else {
          return;
        }
      }
    });

  };

  seedData();
};

getFullData(initData);

module.exports = getFullData;

////////////////////////////////////////

// const faker = require('faker');
// const Places = require('./index.js');
// const Promise = require('bluebird');
// const mongoose = require('mongoose');
// const mongodb = require('./index.js');
// const path = require('path');
// const data = require('./zagatData.json');
// const fs = require('fs');

// const insertData = () => {
//   fs.readFile(path.join(__dirName, 'zagatData.json' (err, data) => {
//     if (err) {
//       console.log ('readFile error:', err)
//     }
//     else {
//       const inputData = JSON.parse(data);
//       console.log('This is the data:', inputData)
//       mongodb.Places.create(inputData);
//     }
//   });
// };

// insertData(data);