const express = require('express');
const getPath = require('../lib/getPath');
const fs = require('fs');
const path = require('path');
const { getContent } = require('../lib/helpers');
const router = express.Router();

// Get all the content in the path of cloud folder
router.get('/:path?', async (req, res, next) => {

	try {
		var paths = getPath('/');

		// If client requests a folder path with hyphens inside the root
		if (req.params.path) {
			paths = getPath('/' + req.params.path.replace('-', '/'));

			// Checking if dir exists
			console.log('Cheking access to dir', paths.relativePath);
			await fs.access(paths.absolutePath, (err) => {
				if (err) {
					res.status(400).end();
				}
			});
			// if (!fs.lstatSync(paths.absolutePath).isDirectory()) {
			// 	console.log('ERROR: Directory does not exist');
			// 	process.exitCode(404);
			// }
		}
		console.log(paths);

		var content = getContent(paths);

		res.json(content);

	} catch(err) {
		next(err);
	}
});

module.exports = router;