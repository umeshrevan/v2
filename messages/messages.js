const messages = {
	registeredSuccess: { messaege: 'You are registered successfully' },
	userNamePattern: { message: 'The pattern for username should be like: U18' },
	passwordPattern: { message: 'The pattern for password be like: Umeshrathva@18' },
	alreadyRegisteredUsername: { messaege: 'Already registered username' },
	alreadyRegisteredEmail: { messaege: 'Already registered email' },
	alreadyRegisteredId: { messaege: 'Already registered Id' },
	userNotFound: { message: 'User not found' },
	invalidCredentials: { messaege: 'Invalid credentials' },
	unAuthorized: { messaege: 'You are unauthorized!' },
	forbidden: { messages: 'Forbidden' },
	authorized: { messages: 'Authorized' },
	loginSuccess: { messaege: 'You are logged in successfully' }
}

const status = { statusSuccess: 200, statusNotFound: 404, badrequest: 400, alreadyExist: 401 }

module.exports = { messages, status }