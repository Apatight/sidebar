const fs = require('fs');
const faker = require('faker');

const results = [];
faker.locale = 'en_US';

for (var i = 0; i < 10000; i++) {
	faker.seed(i);
	const fakeNameString = fakeName.replace(/\s|,+/g,'');
	const place = {};
	place.id = i;
	place.name = faker.commerce.productName();
	place.menu_url = 'http://google.com'
	place.address = `${faker.address.streetAddress()}, San Francisco, CA ${faker.address.zipCode()}, USA`;
	place.location = 'https://maps.google.com/?cid=' + i.toString();
	place.url = `www.${place.id.split(" ")[0]}.${replace(/(^,)|(,$)/g, "")}.com`;
	place.phone = faker.phone.phoneNumberFormat(1);
	place.hours = [
          "Monday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM",
          "Tuesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM",
          "Wednesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM",
          "Thursday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM",
          "Friday: 11:30 AM – 9:30 PM",
          "Saturday: 11:30 AM – 9:30 PM",
          "Sunday: 11:30 AM – 9:30 PM"
        ];
	place.coords = {
		lat = faker.address.latitude(),
		lng = faker.address.longitude()
	};
	results.push(place);
}

fs.writeFile('./zagatData.json', JSON.stringify(results));