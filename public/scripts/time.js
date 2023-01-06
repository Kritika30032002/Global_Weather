const moment = require('moment');

module.exports = timeObject = {
    time:moment().format('HH:MM:SS').toUpperCase(),
    dayMethod:moment().format('a').toUpperCase(),
    day:moment().format('dddd').toUpperCase(),
    today:moment().format('MMMM Do YYYY').toUpperCase(),
}

console.log(timeObject);