const { messages, status } = require('../messages/messages')
function v1updateProfile(req, res, next) {
	try {
		const { sUsername, sPassword } = req.body
		const usernameRegex = /^(?=.*[A-Z])[A-Z0-9]+$/ //(one capital letter, other numbers):
		const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/ //(password should contain atleast one number and one special character):
		if (usernameRegex.test(sUsername) === false) {
			return res.status(status.alreadyExist).json(messages.userNamePattern)
		}
		else if (passwordRegex.test(sPassword) === false) {
			return res.status(status.alreadyExist).json(messages.passwordPattern)
		}
		next()
	} catch (error) {
		console.log('Error on update v1 user:', error)
	}
}

function v2updateProfile(req, res, next) {
	try {
		const { sUsername, sPassword } = req.body
		const usernameRegex = /^[A-Z]+$/ //(all capital letters):
		const passwordRegex = /^[0-9]{16}$/ //(all numbers with length 16):
		if (usernameRegex.test(sUsername) === false) {
			return res.status(status.alreadyExist).json(messages.userNamePattern)
		}
		else if (passwordRegex.test(sPassword) === false) {
			return res.status(status.alreadyExist).json(messages.passwordPattern)
		}
		next()
	} catch (error) {
		console.log('Error on update v2 user:',error)
	}
}
module.exports = { v1updateProfile, v2updateProfile }