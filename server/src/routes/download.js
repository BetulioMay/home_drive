const express = require('express');
const getPath = require('../lib/getPath');
const router = express.Router();

// router.get('/', (req, res) => {
// 	res.send('This is the download endpoint');
// });

router.get('/:path?', (req, res, next) => {
	try {

		// var dwl_path = (req.params.path) ? getPath('/', req.params.path) : getPath('/');
		var dwl_path = getPath('/' + req.params.path);

		console.log('Downloading file', dwl_path.relativePath);
		res.download(dwl_path.absolutePath, (err) => {
			if (err) {
				console.error(err);
				res.status(500).json({
					message: 'File could not be downloaded.',
					success: false
				});
			}
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;