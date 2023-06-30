
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const { MongoClient } = require('mongodb')


const url = 'mongodb://localhost:27017'
const dbName = 'db'


function sendEmail() {

	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'umesh.rathva@yudiz.com',
			pass: 'umeshrathva@18'
		}
	})


	const mailOptions = {
		from: 'umesh.rathva@yudiz.com',
		to: 'umeshrevan3042@gmail.com',
		subject: 'Subject of the email',
		text: 'Body of the email'
	}


	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log('Error sending email:', error)
		} else {
			console.log('Email sent:', info.response)

	
			MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
				if (err) {
					console.log('Error connecting to the database:', err)
				} else {
					const db = client.db(dbName)
					const collection = db.collection('your-collection')
					const lastSentEmailTime = new Date()
					const success = true
					const filter = { mentionId: 'ur@gmail.com' }
					const update = { $set: { lastSentEmailTime, success } }
					collection.updateOne(filter, update, function(err) {
						if (err) {
							console.log('Error updating database:', err)
						} else {
							console.log('Database updated successfully')
						}
						client.close()
					})
				}
			})
		}
	})
}


cron.schedule('*/15    ', function() {
	sendEmail()
})
module.exports = sendEmail