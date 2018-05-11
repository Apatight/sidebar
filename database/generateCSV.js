const fs = require('fs');
const faker = require('faker');

faker.locale = 'en_US';
//count down from 10m
const total = 10000000;

const createSidebars = (i) => {
	// if (i === 1) {
 //    // This is gonna really slow you down, reconsider.
 //    // maybe only print it out at milestones.
 //    // <3 Steve
	// 	console.log('record', i, 'created');
	// };
  const id = i;
  const name = faker.commerce.productName();
  const menu_url = 'http://google.com';
  const address = `${faker.address.streetAddress()}, San Francisco, CA ${faker.address.zipCode()}, USA`;
  const location = `https://maps.google.com/?cid=${i.toString()}`;
  const url = `www.${place.name.split(' ')[0].replace(/(^,)|(,$)/g, '')}.com`;
  const phone = faker.phone.phoneNumberFormat(1);
  const hours = [
    'Monday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Tuesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Wednesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Thursday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Friday: 11:30 AM – 9:30 PM',
    'Saturday: 11:30 AM – 9:30 PM',
    'Sunday: 11:30 AM – 9:30 PM',
  ];
  const coords = { lat: null, lng: null };
  const coords.lat = faker.address.latitude();
  const coords.lng = faker.address.longitude();
  const place = []
};

const generate = (writer, encoding, callback) => {
  let x = total;
  function write() {
    let written = true;
    do {
      x -= 1;
      let stringified = JSON.stringify(createSidebars(x));
      if (x === total - 1) {
        stringified = `[${stringified}`;
      }
      if (x !== 0) {
        stringified += ',';
      }
      if (x === 0) {
        stringified += ']';
        writer.write(stringified, encoding, callback);
      } else {
        written = writer.write(stringified, encoding);
      }
    } while (x > 0 && written);
    if (x > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

generate(fs.createWriteStream('./zagatData.json', 'utf8', () => {
  console.log('WriteStream 10million completed!');
}));