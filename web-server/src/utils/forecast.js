const { urlencoded } = require('express')
const request = require('request')

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=11efe9a35c8893e921ab3e013d7fb042&query=${lat},${long}`
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable service maybe you want check your connection')
		} else if (response.body.error) {
			const { info } = response.body.error
			callback(info)
		} else {
			callback(undefined, response.body.current.temperature)
		}
	})
}

module.exports = forecast
