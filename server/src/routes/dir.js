const express = require('express');
const fs = require('fs');
const path = require('path');
const getPath = require('../lib/getPath');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('This is the mkdir endpoint');
});

router.post('/make', async (req, res, next) => {

	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).json({
			message: 'Incorrect request body',
		}).end();
	} else {
		try {
			const dir_name = req.body.name;
			const dir_path = getPath(req.body.path);
			const dir = path.join(dir_path.absolutePath, dir_name);

			console.log('Cheking access to dir', dir_path.relativePath);
			await fs.access(dir_path.absolutePath, (err) => {
				if (err) {
					res.status(400).end();
				}
			});
			
			console.log('Checking if already exists');

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, (err) => {
					if (err) {
						res.status(402).end();
						throw err;
					}
				});
			} else {
				res.status(400).json({
					message: 'Directory already exists',
					success: false
				});
			}

			res.json({
				dir: req.body,
				message: 'Directory created successfully',
				success: true
			});

		} catch (err) {
			next(err);
		}
	}
});

module.exports = router;