console.log('Hello express i´m here !!')

// dom references GLOBAL

const $searchForm = document.querySelector('.main__form ')
const $temperature = document.getElementById('temperature')
const $location = document.getElementById('location')
const $img = document.getElementById('imgCountry')

// print-data with data at fetch

const printData = async ({ error, location, temperature, country }) => {
	if (error) {
		$temperature.innerHTML = error
		$location.innerHTML = ''
		$img.removeAttribute('src')

		console.log(error)
	} else {
		const codeImg = await returnCountryCode(country)

		$temperature.innerHTML = temperature + '°'
		$location.innerHTML = location
		$img.setAttribute('src', `https://flagcdn.com/24x18/${codeImg}.png`)
	}
}

// const response = await fetch('http://api.allorigins.win/get?url=https://flagcdn.com/en/codes.json')

const returnCountryCode = async (country) => {
	const response = await fetch('https://cors-anywhere.herokuapp.com/https://flagcdn.com/en/codes.json')
	const data = await response.json()
	const countriesEntries = Object.entries(data)

	//save a country iteranting entries

	let conuntryFound = ''
	countriesEntries.forEach((coun) => {
		const countryApi = coun[1]
		const cleanCountry = countryApi.replace(' ', '').toLowerCase()
		const cleanCountry2 = country.replace(' ', '').toLowerCase()
		if (cleanCountry == cleanCountry2) {
			conuntryFound = coun[0]
			return
		}
	})

	return conuntryFound
}

$searchForm.addEventListener('submit', (e) => {
	e.preventDefault()
	$temperature.innerHTML = 'Loading...'
	$location.innerHTML = ''
	$img.removeAttribute('src')
	const data = new FormData($searchForm)

	const location = data.get('location')
	if (location) {
		fetch(`/weather?address=${location}`)
			.then((res) => res.json())
			.then((data) => {
				printData(data)
			})
	}
})
