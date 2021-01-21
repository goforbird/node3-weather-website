const request = require('request')

const parseTime = (apiTime, offset) => {
    const time = apiTime.split(' ')
    const hour = time[0].split(':')
    const modTime = parseInt(hour[0]) + parseInt(offset)
    if (modTime < 0) {
        const newTime = parseInt(hour[0]) + parseInt(offset) + 24
        return newTime.toString() + ':' + hour[1]
    } else if (modTime > 24) {
        const newTime = parseInt(hour[0]) + parseInt(offset) - 24
        return newTime.toString() + ':' + hour[1]
    } else {
        const newTime = parseInt(hour[0]) + parseInt(offset)
        return newTime.toString() + ':' + hour[1]
    }
}

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e1ae7a5d7646724be26f23f445860345&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Low level error')
        } else if (body.error){
            callback('Server returned an error. Did you provide a valid location?')
        } else {
            const timePub = parseTime(body.current.observation_time, body.location.utc_offset)
            console.log(timePub)
            callback(undefined, 'As of ' + timePub + ' local time, the weather is ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees F out. It feels like ' + body.current.feelslike + ' degrees F. The humiditiy is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast