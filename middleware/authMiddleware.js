const jwt = require('jsonwebtoken')
//const path = require('path')
//const users = require('../db.json')
const config = require('../config/config')
//const { isAuthorized } = require('../validators/userValidator')
const { messages, status } = require('../messages/messages')
const dbConnect = require('../utils/mongodb')

async function verifyToken(req, res, next) {
	try {
		const token = req.headers['authorization']
		if (!token) {
			return res.status(status.statusNotFound).json(messages.unAuthorized)
		}
		jwt.verify(token, config.app.secretkey, async (err, decoded) => {
			if (err) {
				return res.status(status.badrequest).json(messages.forbidden)
			}
			//console.log('type>>>>', decoded)
			req.decodedData = decoded
			const sId = decoded.sId
			//const user = users.usersData.find(obj => obj.sId === decoded.sId)
			const users = await dbConnect()
			const isUser = await users.findOne({sId})
			console.log(sId,'in verify')
			if(isUser){
				next()
			}
			// if (!user) {
			// 	//console.log(req.path)
			// 	return res.status(status.badrequest).json(messages.unAuthorized)
			// }
			// else {
			// 	next()
			// 	//res.status(status.statusSuccess).json(messages.authorized)
			// }
		})
	} catch (error) {
		console.log(error)
	}
}

// function isAuthorized(role, path) {
// 	console.log('Inside isAuthorized')
// 	console.log(role,path,role === 'admin' , path.startsWith('/user'))
// 	try {
// 		return role === 'admin' || path.startsWith('/user')
// 	}
// 	catch (error) {
// 		console.log('Error on authorizing user:', error)
// 	}
// }
async function isAuthorized(req, res, next){
	const sId = req.decodedData.sId
	//const user = users.usersData.find(obj => obj.sId === req.decodedData.sId)
	const users = await dbConnect()
	const user = await users.findOne({sId})
	console.log(req.decodedData,req.path)
	if (user.sRole === 'admin' || req.path.startsWith('/user')){
		next()
		//return res.status(status.statusSuccess).json(messages.authorized)
		
	} else {
		return res.status(status.badrequest).json(messages.unAuthorized)
	}
}

function authorizeStatus(req, res){
	return res.status(status.statusSuccess).json(messages.authorized)
}

module.exports = { verifyToken, isAuthorized, authorizeStatus }