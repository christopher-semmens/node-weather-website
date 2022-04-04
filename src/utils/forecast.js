const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const accessKey = 'da4d50b098f679ec09153d27dd35dae6'
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=m`
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            const { weather_descriptions: description, temperature, feelslike } = body.current

            const temperatureDegrees = temperature === 1 ? 'degrees' : 'degree'
            const feelslikeDegrees = feelslike === 1 ? 'degrees' : 'degree'

            callback(undefined, `${description[0]}. It is currently ${temperature} ${temperatureDegrees} out. It feels like ${feelslike} ${feelslikeDegrees}. The humidity is ${humidity}%.`)
        }
    })
}

module.exports = forecast