const path = require('path');
const fs = require('fs');
require('./getPath');

module.exports = {
	getContent: function(paths) {
		var content = {
			path: paths.relativePath,
			files: [], // Array of objects (filename)
			directories: [] // Array of dirs
		}

		var files = fs.readdirSync(paths.absolutePath);
		for (var i = 0; i < files.length; i++) {
			var stat = fs.lstatSync(path.join(paths.absolutePath, files[i]));
			if (stat.isDirectory()) {
				content.directories.push(files[i]);
			} else {
				content.files.push(files[i]);
			}
		}
		return content;
	}
}