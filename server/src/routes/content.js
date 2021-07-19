const express = require('express');
const getPath = require('../lib/getPath');
const fs = require('fs');
const { getContent } = require('../lib/helpers');
const router = express.Router();

// Get all the content in the path of cloud folder
router.get('/:path?', (req, res, next) => {

	try {
		var paths = getPath('/');

		// If client requests a folder path with hyphens inside the root
		if (req.params.path) {
			paths = getPath(req.params.path);
			// Checking if dir exists
			console.log('Checking access to dir', paths.relativePath);
			fs.access(paths.absolutePath, (err) => {
				if (err) {
					res.status(400).end();
				}
			});
			// if (!fs.lstatSync(paths.absolutePath).isDirectory()) {
			// 	console.log('ERROR: Directory does not exist');
			// 	process.exitCode(404);
			// }
		}
		// console.log(paths);

		var content = getContent(paths);

		res.json({
			content,
			success: true
		});

	} catch(err) {
		next(err);
	}
});

router.delete('/delete/:path', async (req, res) => {

	const path = getPath('/' + req.params.path);
	// console.log(path);

	// Check if exists such path
	if (fs.existsSync(path.absolutePath)) {
		if (fs.lstatSync(path.absolutePath).isFile()) {

			// DELETE for files
			console.log('Deleting file', path.relativePath+'...');
			await fs.promises.unlink(path.absolutePath, (err) => {
				if (err) {
					console.error(err);
					res.status(500).json({
						message: 'File could not be downloaded.',
						success: false
					});
				}
			});
			res.json({
				path_deleted: path.relativePath,
				message: 'File deleted successfully',
				success: true
			});
		} else {

			// DELETE for folders
			console.log('Deleting folder', path.relativePath+'...');
			await fs.promises.rm(path.absolutePath, { recursive: true }, (err) => {
				if (err) {
					console.error(err);
					res.status(500).json({
						message: 'File could not be downloaded.',
						success: false
					});
				}
			});
			res.json({
				path_deleted: path.relativePath,
				message: 'Folder deleted successfully',
				success: true
			});
		}
	} else {
		res.status(400).json({
			message: 'File or folder does not exist',
			success: false
		});
	}
});

module.exports = router;