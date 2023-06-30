const express = require('express')
const { v2usersValidators } = require('../validators/usersValidators')
const { v2updateProfile } = require('../validators/updateValidators')
const { updateUser, registerUser, authorizeUser } = require('../controllers/usersController')
const { generateToken } = require('../middleware/loginMiddleware')
const { verifyToken, isAuthorized, authorizeStatus} = require('../middleware/authMiddleware')
const routerV2 = express.Router()


/* Routes for V2  */
routerV2.post('/signup', v2usersValidators, registerUser)
routerV2.put('/:sId', v2updateProfile, isAuthorized, updateUser)
routerV2.post('/login',authorizeUser, generateToken)
routerV2.get('/protected', verifyToken, isAuthorized, authorizeStatus)
routerV2.get('/user/protected', verifyToken, isAuthorized, authorizeStatus)
module.exports = routerV2 