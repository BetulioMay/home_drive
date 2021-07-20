const express = require('express');
const fs = require('fs');
const path = require('path');
const getPath = require('../lib/getPath');
const router = express.Router();

// router.get('/', (req, res) => {
// 	res.send('This is the mkdir endpoint');
// });

// TODO: mkdir with a path param. (CHECK - OK)
router.post('/:path?', async (req, res, next) => {

	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).json({
			message: 'Incorrect request body',
		}).end();
	} else {
		try {
			const dir_name = req.body.name;
			const dir_path = (req.params.path) ? getPath(req.params.path) : getPath('/');
			const dir = path.join(dir_path.absolutePath, dir_name);

			// Match correct pattern
			if (dir_name.search('--') !== -1) {
				return res.status(400).json({
					message: 'Incorrect name pattern',
					success: false
				})
			}

			console.log('Checking access to dir', dir_path.relativePath);
			fs.access(dir_path.absolutePath, (err) => {
				if (err) {
					res.status(400).json({
						message: 'Destination directory not found.',
						success: false
					}).end();
				}
			});
			
			console.log('Checking if dir already exists');
			if (!fs.existsSync(dir)) {
				// fs.mkdirSync(dir, (err) => {
				// 	if (err) {
				// 		res.status(402).end();
				// 		throw err;
				// 	}
				// });
				await fs.promises.mkdir(dir, (err) => {
					if (err) {
						console.error(err);
						res.status(500).json({
							message: 'Directory could not be created.',
							success: false
						});
					}
				});
			} else {
				res.status(400).json({
					message: 'Directory already exists',
					success: false
				});
			}

			console.log(`${req.body.name} created at ${dir_path.relativePath}`);
			res.json({
				dir_path: path.join(dir_path.relativePath, dir_name),
				message: 'Directory created successfully',
				success: true
			});

		} catch (err) {
			next(err);
		}
	}
});

module.exports = router;