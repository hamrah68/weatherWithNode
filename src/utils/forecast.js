const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/00d7362e44dd5a574ea61937055a7e18/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        const { temperature, precipProbability } = body.currently;
        const { summary } = body.daily.data[0];
        if (error) {
            callback('Unable to Connect to Weather Service', undefined)
        } else if (body.error) {
            callback('Unable find The Location', undefined)
        } else {
            callback(undefined, `${summary} it is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast;