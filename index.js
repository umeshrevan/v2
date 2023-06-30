
const express = require('express')
require('dotenv').config()
//const path = require('path')
const config = require('./config/config')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
const dbConnect = require('./utils/mongodb')
dbConnect()
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/db')
// const customCron = require('./cron')
// customCron.sendMailAllUser()


// const {I18n} = require('i18n')
// const i18n = new I18n({
// 	locales: ['en' , 'hn'],
// 	directory: path.join(__dirname, 'translation'),
// 	defaultLocale: 'hn'
// })
// app.use(i18n.init)
// app.use((req, res, next)=>{
// 	i18n.setLocale(req,req.headers['language'])
// 	next()
// })

// app.get('/test', (req, res)=>{
// 	res.send({id: 1, name: res.__('MESSAGE')})
// })
// app.post('/test', (req, res) => {
// 	console.log('test post')
// 	return res.json(req.body)
// })


const v1userRoute = require('./routes/v1userRoutes')
const v2userRoute = require('./routes/v2userRoutes')
app.use('/v1', v1userRoute)


app.use('/v2', v2userRoute)

app.get('/id/:id?', function(req, res) {
	res.send('id: ' + req.params.id) //Expect id in this route
})
app.get('/id/:id', function(req, res) {
	res.send('id: ' + req.params.id) 
})
app.all('*', (req, res) => {
	res.json({ messages: 'No routes found' })
})
app.listen(config.app.port, () => {
	console.log(`Server listening on port ${config.app.port}`)
})