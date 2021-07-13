const express = require('express');
const getPath = require('../lib/getPath');
const fs = require('fs');
const path = require('path');
const { getContent } = require('../lib/helpers');
const router = express.Router();

// Get all the content in the path of cloud folder
router.get('/:path?', (req, res) => {

	var paths = getPath('/');
	if(req.params.path) {
		paths = getPath('/'+req.params.path.replace('-', '/'));

		if (!fs.lstatSync(paths.absolutePath).isDirectory()) {
			console.log('ERROR: Directory does not exist');
			process.exitCode(404);
		}
	}
	console.log(paths);

	var content = getContent(paths);

	res.json(content);
});



module.exports = router;