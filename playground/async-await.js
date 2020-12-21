const doWork = async () => {
	throw new Error('something went wrong')

	return 'Facundo'
}

doWork()
	.then((result) => console.log(result))
	.catch((error) => {
		console.log(error)
	})
