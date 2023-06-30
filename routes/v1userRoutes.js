const express = require('express')
const { v1usersValidators, } = require('../validators/usersValidators')
const { v1updateProfile, } = require('../validators/updateValidators')
const { updateUser, registerUser, authorizeUser } = require('../controllers/usersController')
const { generateToken } = require('../middleware/loginMiddleware')
const { verifyToken, isAuthorized, authorizeStatus } = require('../middleware/authMiddleware')
const sendEmail = require('../emailCron')
const routerV1 = express.Router()

/* Routes for V1  */
routerV1.post('/signup', v1usersValidators, registerUser)
routerV1.put('/:sId',v1updateProfile, updateUser)
routerV1.post('/login', authorizeUser, generateToken)
routerV1.get('/protected', verifyToken, isAuthorized, authorizeStatus)
routerV1.get('/user/protected', verifyToken, isAuthorized, authorizeStatus)
routerV1.get('/email',sendEmail)
module.exports = routerV1