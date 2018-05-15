const data = require ('./generateData.js');
const {expect} = require('chai');

//obj destructuring example
// var chai = {
// 	expect: ----,
//	should: ----
// }
//instead of having to write const expect = require('chai').expect
// var {expect} = chai

test('creates an object with all the correct fields', () => {
  expect(data.createSidebars(0)).to.have.all.keys('id', 'name', 'menu_url', 'address', 'location', 'url', 'phone', 'hours', 'lat', 'lng');
});

//Come back to this later
// test('creates a JSON object'), () => {
// 	var parsedData = JSON.parse(data.createSidebar(2))
// 	expect(parsedData).toBe()
// }
