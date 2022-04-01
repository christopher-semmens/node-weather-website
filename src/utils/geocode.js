const request = require('postman-request')

const geocode = (address, callback) => {
    const searhTerm = encodeURIComponent(address)
    const accessToken = 'pk.eyJ1IjoiY2hyaXNzZW1tZW5zIiwiYSI6ImNsMWM5MXBtOTA1ZGszam5ycDkwNHZqM2gifQ.aXWykS00ZHEh5qnhHgb4VA'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searhTerm}.json?access_token=${accessToken}&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]

            callback(undefined, {
                latitude,
                longitude,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode