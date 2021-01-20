const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ29mb3JiaXJkIiwiYSI6ImNranlqM2d3dDBlcDIycHFrcDJwbGRzcHoifQ.qvXRfhpfl93EbPhlM_6s3Q&limit=1'
    request({url, json:true}, (error, response) => {
        if (error) {
            callback('Low level error. Internet out?')
        } else if (response.body.message) {
            callback(response.body.message)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode