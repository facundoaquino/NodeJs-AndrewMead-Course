const request = require('request')

const geoCode = (adress, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoiZmFjdW45MCIsImEiOiJja2h0Y2sxN3cwbXZjMnVxbzNreDZmdmJoIn0.2kEQRd1fH8XpOy2htrGefA&limit=1`

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to location services!')
		} else if (response.body.features.length == 0 || response.body.features[0] == undefined) {
			callback('Location not found, please try whit other')
		} else {
			let countrySearch = ''
			const body = response.body.features[0].context || response.body.features[0].text
			 

			if (body instanceof Array) {
				body.forEach((con) => {
					if (con['text']) {
						countrySearch = con['text']
					}
				})
			} else {
				countrySearch = body
			}

			callback(null, {
				latitude: response.body.features[0].center[1],
				longitud: response.body.features[0].center[0],
				location: response.body.features[0].place_name,
				country: countrySearch,
				// country: response.body.features[0].context[1].text,
			})
		}
	})
}

module.exports = geoCode
