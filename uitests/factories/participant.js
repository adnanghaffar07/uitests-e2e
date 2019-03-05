var Factory = require('rosie').Factory
var faker = require('faker')

module.exports = new Factory()
    .attr('survey_code', () => faker.random.number({min: 1000, max: 999999999}).toString())
