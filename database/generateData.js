const fs = require('fs');
const faker = require('faker');

faker.locale = 'en_US';
//count down from 10m
const total = 10000000;

/*

TO GENERATE THE DATA:
node generateData.js | gnomon

TO SEED DATA IN MONGO:

time mongoimport --db apatight-sidebar --collection places --file zagatData.json --numInsertionWorkers 2 | gnomon

TO SEED DATA IN POSTGRESQL from within pg-apatight:

\copy sidebar ('id', 'name', 'menu_url', 'address', 'location', 'url', 'phone', 'hours', 'coords')
FROM '/Users/jessicarahman/Desktop/sidebar/database/zagatData.csv'
DELIMITER ',' CSV HEADER;

*/

const createSidebars = (i) => {
	if (i === 1) {
		console.log('record 1 created');
	};
  if (i === 5000000) {
    console.log('record 5m created');
  };
  const place = {};
  place.id = i;
  place.name = faker.commerce.productName();
  place.menu_url = 'http://google.com';
  place.address = `${faker.address.streetAddress()}, San Francisco, CA ${faker.address.zipCode()}, USA`;
  place.location = `https://maps.google.com/?cid=${i.toString()}`;
  place.url = `www.${place.name.split(' ')[0].replace(/(^,)|(,$)/g, '')}.com`;
  place.phone = faker.phone.phoneNumberFormat(1);
  place.hours = [
    'Monday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Tuesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Wednesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Thursday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Friday: 11:30 AM – 9:30 PM',
    'Saturday: 11:30 AM – 9:30 PM',
    'Sunday: 11:30 AM – 9:30 PM',
  ];
  place.lat = faker.address.latitude();
  place.lng = faker.address.longitude();
  return place;
};

const generate = (writer, encoding, callback) => {
  let x = total;
  function write() {
    let written = true;
    do {
      x -= 1;
      let stringified = JSON.stringify(createSidebars(x));
      stringified += '\n'; 
      written = writer.write(stringified, encoding);
    }
    while (x > 0 && written);
    if (x > 0) {
      writer.once('drain', write);
    }
    else {
      //if (x === 0) do this
        callback;
    }
  }
  write();
};

generate(fs.createWriteStream('./zagatData.json', 'utf8', () => {
  console.log('WriteStream 10million completed!');
}));

module.exports.generate = generate;
module.exports.createSidebars = createSidebars;
