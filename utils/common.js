const fs = require('fs')

function readFile(filePath) {
	try {
		const fileData = fs.readFileSync(filePath, 'utf-8')
		return JSON.parse(fileData)
	} catch (error) {
		console.log('Error reading file:', error)
		return null
	}
}

function writeFile(filePath, data) {
	try {
		fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8')
	} catch (error) {
		console.log('Error writing file:', error)
	}
}

module.exports = { readFile, writeFile }