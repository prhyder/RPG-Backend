require('babel-register')({
	presets: ['env']
});
//Import the rest of the application.
module.exports = require('./server.js');