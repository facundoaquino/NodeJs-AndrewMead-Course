// Crud create read update deleate

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// whit destructuring

const { MongoClient, ObjectID } = require('mongodb')

// object id custum and create a new instance of the object ObjectId
// _id is by default assign by mongo like a unique indentifider  and isn´t a string or number there is a ObjectId with type of binary data

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

//

const connectionURL = 'mongodb://127.0.0.1:27017'
const dataBaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('unable to connect to database!')
	}

	const db = client.db(dataBaseName)

	// db.collection('users').insertOne(
	// 	{
	// 		name: 'Facu',
	// 		age: 30,
	// 	},
	// 	(error, result) => {
	// 		if (error) {
	// 			return console.log('unable to insert user')
	// 		}

	// 		console.log(result.ops)
	// 	}
	// )

	//insert more of one document

	// db.collection('users').insertMany(
	// 	[
	// 		{
	// 			name: 'Julia',
	// 			age: 33,
	// 		},
	// 		{
	// 			name: 'Gunther',
	// 			age: 14,
	// 		},
	// 	],
	// 	(error, result) => {
	// 		if (error) {
	// 			return console.log(error)
	// 		}
	// 		console.log(result.ops)
	// 	}
	// )

	// db.collection('tasks').insertMany(
	// 	[
	// 		{
	// 			description: 'clean the house',
	// 			completed: false,
	// 		},
	// 		{
	// 			description: 'study javascript and express',
	// 			completed: true,
	// 		},
	// 		{
	// 			description: 'call mom',
	// 			completed: false,
	// 		},
	// 	],
	// 	(error, result) => {
	// 		if (error) {
	// 			return console.log('unable to update documents')
	// 		}

	// 		console.log(result.ops)
	// 	}
	// )

	// read a user with findOne

	//search a document and dont find them is not a error  , in that case the result(user in this case) was be null

	db.collection('users').findOne({ name: 'Julia' }, (error, user) => {
		if (error) {
			return console.log('unable to fetch')
		}

		console.log(user)
	})

	// search by user id  , remember _id mongo, is not a string or a number , there is a binary data , so...

	db.collection('users').findOne({ _id: new ObjectID('5fd1421c4f11d43340c9ec82') }, (error, user) => {
		if (error) {
			return console.log('unable to find a user sorry...')
		}

		console.log(user)
	})

	// find many documents with find
	// find dont recives a callback parametrer , this method return a cursor and have many methods like 'toArray' to use

	db.collection('users')
		.find({ age: 30 })
		.toArray((error, users) => {
			// console.log(users)
		})

	db.collection('users')
		.find({ age: 30 })
		.count((error, users) => {
			// console.log(users)
		})

	// use $gt to specifice more than >  , this is the sintaxis..

	db.collection('users')
		.find({ age: { $gt: 30 } })
		.toArray((error, users) => {
			// console.log(users)
		})

	// update a user width updateOne , remerber methods like this reutrn a promise
	//visit page of operator update of mongodb  for example , $set or $inc ...

	const updatePromise = db.collection('users').updateOne(
		{ _id: new ObjectID('5fd1421c4f11d43340c9ec81') },
		{
			$inc: {
				age: 1,
			},
		}
	)

	updatePromise
		.then((result) => console.log(result))
		.catch((error) => {
			console.log(error)
		})

	//updateMany

	db.collection('tasks')
		.updateMany({ completed: false }, { $set: { completed: true } })
		.then((result) => console.log(result))
		.catch((error) => console.log(error))

	//delete width deleteMany

	db.collection('users')
		.deleteMany({ age: 30 })
		.then((result) => console.log(result))
		.catch((error) => console.log(error))

	db.collection('tasks')
		.deleteOne({ description: 'call mom' })
		.then((result) => console.log(result))
		.catch((error) => console.log(error))
})
