const crypto = require('crypto')
//const users = require('../db.json')
const { messages, status } = require('../messages/messages')
const { hashPassword } = require('../middleware/loginMiddleware')
//const { readFile } = require('../utils/common')
const dbConnect = require('../utils/mongodb')

const registerUser = async(req, res) => {
	try {
		console.log('---')
		const { sId, sUsername, sEmail, sPassword, sRole } = req.body
		const users = await dbConnect()
		const isUser = await users.findOne({sId})
		console.log(isUser)
		if (isUser) {
			return res.status(status.alreadyExist).json(messages.alreadyRegisteredId)
		}
		else {
			const user = { sId, sUsername, sEmail, sPassword: hashPassword(sPassword), sRole }
			user.sPassword = hashPassword(user.sPassword)

			await users.insertOne(user)
			res.status(status.statusSuccess).json(messages.registeredSuccess)
		}
	} catch (error) {
		console.log('Error on register user:', error)
	}
}

// const registerUser = (req, res) => {
// 	try {
// 		const { sId, sUsername, sEmail, sPassword, sRole } = req.body
// 		//const users = JSON.parse(fs.readFileSync('db.json', 'utf-8'))
// 		const users = readFile('db.json')
// 		const user = users.usersData.find(obj => obj.sId === sId)
// 		if (user) {
// 			return res.status(status.alreadyExist).json(messages.alreadyRegisteredId)
// 		}
// 		else {
// 			const user = { sId, sUsername, sEmail, sPassword: hashPassword(sPassword), sRole }
// 			user.sPassword = hashPassword(user.sPassword)
// 			users.usersData.push(user)
// 			writeFile('db.json', users)
// 			//fs.writeFileSync('db.json', JSON.stringify(users), 'utf-8')
// 			res.status(status.statusSuccess).json(messages.registeredSuccess)
// 		}
// 	} catch (error) {
// 		console.log('Error on register user:', error)
// 	}
// }

const updateUser = async(req, res) => {
	try {
		const sId = req.params.sId
		const sUsername = req.body.sUsername
		const sPassword = req.body.sPassword
		const users = await dbConnect()
		const isUser = await users.findOne({sId})
		console.log(isUser)
		if (isUser) {
			//users.sUsername = sUsername
			//users.sPassword = hashPassword(sPassword)
			await users.updateOne({sId:sId},{$set:{sUsername:sUsername, sPassword:hashPassword(sPassword)}})
			res.status(201).json({ message: 'Data updated successfully:' })
		}
		else {
			return res.status(404).json({ message: 'User doesn\'t exists:' })
		}
	} catch (error) {
		console.log('Error on update user:', error)
	}
}

// const updateUser = (req, res) => {
// 	try {
// 		const sId = req.params.sId
// 		console.log(sId)
// 		const sUsername = req.body.sUsername
// 		const sPassword = req.body.sPassword
// 		console.log(sUsername, sPassword)
// 		//const users = JSON.parse(fs.readFileSync('db.json', 'utf-8'))
// 		const users = readFile('db.json')
// 		const user = users.usersData.find(obj => obj.sId === sId)
// 		if (user) {
// 			user.sUsername = sUsername
// 			user.sPassword = hashPassword(sPassword)
// 			writeFile('db.json', users)
// 			//fs.writeFileSync('db.json', JSON.stringify(users), 'utf-8')
// 			res.status(201).json({ message: 'Data updated successfully:' })
// 		}
// 		else {
// 			return res.status(404).json({ message: 'User doesn\'t exists:' })
// 		}
// 	} catch (error) {
// 		console.log('Error on update user:', error)
// 	}
// }

const authorizeUser = async(req, res, next) => {
	try {
		const { sUsername, sPassword } = req.body
		const users = await dbConnect()
		const isUser = await users.findOne({sUsername})
		if (!isUser) {
			return res.status(status.statusNotFound).json(messages.userNotFound)
		}
		const hashedPassword = matchHashed(sPassword)
		console.log(hashedPassword)
		console.log(isUser.sPassword)
		if (isUser.sPassword !== hashedPassword) {
			return res.status(status.statusNotFound).json(messages.invalidCredentials)

		}
		next()
	} catch (error) {
		console.log('Error on login user:', error)
	}
}

// const authorizeUser = (req, res, next) => {
// 	try {
// 		const { sUsername, sPassword } = req.body
// 		//const users = JSON.parse(fs.readFileSync('db.json', 'utf-8'))
// 		const users = readFile('db.json')
// 		const user = users.usersData.find(obj => obj.sUsername === sUsername)
// 		if (!user) {
// 			return res.status(status.statusNotFound).json(messages.userNotFound)
// 		}
// 		const hashedPassword = matchHashed(sPassword)
// 		if (user.sPassword !== hashedPassword) {
// 			return res.status(status.statusNotFound).json(messages.invalidCredentials)

// 		}
// 		next()
// 	} catch (error) {
// 		console.log('Error on login user:', error)
// 	}
// }

function matchHashed(sPassword) {
	return crypto.createHash('sha256').update(sPassword).digest('hex')
}

module.exports = { registerUser, updateUser, authorizeUser }