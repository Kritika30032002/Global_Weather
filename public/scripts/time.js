const moment = require('moment');

const time = () => {
    const timeObject = {
        time: moment().format('hh:mm:ss').toUpperCase(),
        dayMethod: moment().format('a').toUpperCase(),
        day: moment().format('dddd').toUpperCase(),
        today: moment().format('MMMM Do YYYY').toUpperCase(),
    }
    return timeObject;
}

module.exports = time();