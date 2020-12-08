const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars enfine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
	res.render('index', {
		title: 'Wheather App ',
		name: 'Facu Aquino',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Facu Aquino',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpfu text',
		title: 'Help',
		name: 'Facu Aquino',
	})
})

app.get('/weather', (req, res) => {
	const address = req.query.address

	geoCode(address, (err, { latitude, longitud, location, country } = {}) => {
		if (err) {
			res.send({
				error: err,
			})
		} else {
			forecast(latitude, longitud, (error, dataForecast) => {
				if (error) {
					res.send({
						error: err,
					})
				} else {
					res.send({
						location,
						temperature: dataForecast,
						country: country,
					})
				}
			})
		}
	})

	// if (!req.query.address) {
	// 	res.send({
	// 		error: 'you must enter a correct adreess to search the weather',
	// 	})
	// } else {
	// }
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'facu aquino',
		message: 'Help article not found',
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'facu aquino',
		message: 'Page not found',
	})
})

app.listen(3000, () => {
	console.log('Service server online')
})
