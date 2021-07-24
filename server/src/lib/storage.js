const fs = require('fs');

const storage = process.env.HOME_DRIVE_PATH;
// if (storage && fs.existsSync(storage + '')) {
if(storage){
	console.log('Storage located at:', storage);
} else {
	console.error('No storage available.');
	process.exit(500);
}

module.exports = storage;
