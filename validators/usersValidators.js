const dbConnect = require('../utils/mongodb')
const { messages, status } = require('../messages/messages')

async function v1usersValidators(req, res, next) {
	try {
		const { sId, sUsername, sEmail, sPassword } = req.body
		const usernameRegex = /^(?=.*[A-Z])[A-Z0-9]+$/ //(one capital letter, other numbers):
		const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/ //(password should contain atleast one number and one special character):
		const users = await dbConnect()
		const existEmail = await users.findOne({sEmail})
		const existUsername = await users.findOne({sUsername}) //2 line users
		const existId = await users.findOne({sId}) //2 nd
		if (usernameRegex.test(sUsername) === false) {
			return res.status(status.alreadyExist).json(messages.userNamePattern)
		}
		else if (passwordRegex.test(sPassword) === false) {
			//console.log(passwordRegex.test(sPassword))
			return res.status(status.alreadyExist).json(messages.passwordPattern)
		}
		else if (existUsername) {
			return res.status(status.alreadyExist).json(messages.alreadyRegisteredUsername)
		}
		else if (existEmail) {
			return res.status(status.alreadyExist).json(messages.alreadyRegisteredEmail)
		}
		else if (existId) {
			return res.status(status.alreadyExist).json(messages.alreadyRegisteredId)
		}
		next()
	} catch (error) {
		console.log(error)
	}
}

async function v2usersValidators(req, res, next) {
	try {
		const { sId, sUsername, sEmail, sPassword } = req.body
		const usernameRegex = /^(?=.*[!@#$%^&*])[a-z!@#$%^&*]+$/ //(all small letters and one symbol):
		const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{16}$/ //(at least one capital letter, at least one symbol, total length 16):
		const users = await dbConnect()
		const existEmail = await users.findOne({sEmail})
		const existUsername = await users.findOne({sUsername}) //2 line users
		const existId = await users.findOne({sId}) //2 nd
		if (usernameRegex.test(sUsername) === false) {
			return res.status(status.alreadyExist).json(messages.userNamePattern)
		}
		else if (passwordRegex.test(sPassword) === false) {
			//console.log(passwordRegex.test(sPassword))
			return res.status(status.alreadyExist).json(messages.passwordPattern)
		}
		else if (existUsername) {
			return res.status(status.alreadyExist).json(messages.alreadyRegisteredUsername)
		}
		else if (existEmail) {
			return res.status(status.alreadyExist).json(messages.alreadyRegisteredEmail)
		}
		else if (existId) {
			return res.status(status.alreadyExist).json(messages.alreadyRegisteredId)
		}
		next()
	} catch (error) {
		console.log(error)
	}
}

module.exports = { v1usersValidators, v2usersValidators }