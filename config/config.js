require('dotenv').config()
const config = {
	emailUser:'umesh.rathva@yudiz.com',
	emailPassword:'umeshrathva@18',
	app: {
		port: process.env.PORT || 3000,
		secretkey: process.env.SECRET_KEY || 'india'
	}
}

module.exports = config