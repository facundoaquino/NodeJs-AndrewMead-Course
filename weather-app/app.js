// http://api.weatherstack.com/current?access_key=11efe9a35c8893e921ab3e013d7fb042&query=37.8267,-122.4233

const request = require('request')
const forecast = require('./utils/forecast')

const url = 'http://api.weatherstack.com/current?access_key=11efe9a35c8893e921ab3e013d7fb042&query=37.8267,-122.4233 '

// request({ url: url, json: true }, (error, response) => {
// 	if (error) {
// 		console.log('Unable to connect to weather service!!')
//     } else if (response.body.error) {
//         const {info} = response.body.error
//         console.log(info);
//     }
//     else {
// 		const data = response.body.current
// 		console.log(`it is currently ${data.temperature} . It feels like ${data.feelslike} degress out. `)
// 	}
// })

// const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZmFjdW45MCIsImEiOiJja2h0Y2sxN3cwbXZjMnVxbzNreDZmdmJoIn0.2kEQRd1fH8XpOy2htrGefA&limit=1'

// request({ url: urlGeo , json:true}, (error,response)=>{
//     if (error){
//         console.log('Unable to connect to geo service! please check your connection');

//     }else if (response.body.features.length == 0){
//         console.log('Location not found , please try whit other');

//     }else {

//         const [lat,long] = response.body.features[0].center
//         console.log(`lat: ${lat} long:${long}`);
//     }

// })

const geoCode = require('./utils/geocode')

geoCode('barcelona', (error, data) => {
	if (error) {
		return console.log(error)
	}

	forecast(data.latitude, data.longitud, (error, dataForecast) => {
		if (error) {
      return console.log(error)
      
		}
    
    console.log(data.location)
    console.log(dataForecast);
	})
})
