const jwt = require('jsonwebtoken')
const crypto = require('crypto')
//const { readFile } = require('../utils/common')
const dbConnect = require('../utils/mongodb')
//const { messages, status } = require('../messages/messages')

async function generateToken(req, res) {
	try {
		const { sUsername } = req.body
		const users = await dbConnect()
		//const users = readFile('db.json')
		//const users = JSON.parse(fs.readFileSync('db.json', 'utf-8'))
		const user = await users.findOne({sUsername})
		//const user = users.usersData.find(obj => obj.sUsername === sUsername)
    
		const token = jwt.sign({ sId: user.sId }, process.env.SECRET_KEY, { expiresIn: '1h' })
		res.json(token)
	} catch (error) {
		console.log(error)
	}
}

function hashPassword(password) {
	try {
		//const password = req.body.password
		const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
		//console.log(hashedPassword);
		return hashedPassword
	} catch (error) {
		console.log(error)
	}
}
module.exports = { generateToken, hashPassword } 