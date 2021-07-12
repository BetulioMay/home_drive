const fs = require('fs');


const storage = process.env.HOME_DRIVE_PATH;
if (path && fs.existsSync(path+'')) {
	console.log('Storage located at:', path);
} else {
	console.error('No storage available.');
	process.exit(500);
}

module.exports = storage;
