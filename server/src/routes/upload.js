const express = require('express');
const fs = require('fs');
const fup = require('express-fileupload');
const path = require('path');
const getPath = require('../lib/getPath');
const router = express.Router();

router.post('/:path?', async (req, res, next) => {

	try {
		let files;
		let uploadPath;
	
		// Check if there are files to upload
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({
				message: 'No files were upload.',
				success: false
			});
		}

		// Array of file obj to upload to the same directory
		files = (req.files.name.length > 1) ? req.files.name : new Array(req.files.name);
		uploadPath = (req.params.path) ?
					getPath('/' + req.params.path) :
					getPath('/');

		console.log(files);

		// Checking if dir exists
		console.log('Cheking access to dir', uploadPath.relativePath);
		if (fs.existsSync(uploadPath.absolutePath)) {

			var filesUploaded = [];

			for (let file of files) {
				// Checking if the file already exists
				if (fs.existsSync(path.join(uploadPath.absolutePath, file.name))) {
					return res.status(400).json({
						message: 'File already exists.',
						success: false
					});
				}
	
				// Move the file to storage with mv() method
				file.mv(path.join(uploadPath.absolutePath, file.name), (err) => {
					if (err) return res.status(500).json({
						message: `File ${file.name} could not be uploaded to ${uploadPath.absolutePath}`,
						success: false
					});
					
					console.log('Uploaded', file.name+'...');
					// res.json({
						// 	message: 'File uploaded successfully.',
						// 	dest_path: uploadPath.relativePath,
						// 	success: true
						// });
					// });
				});
				let f = {
					file: file.name,
					dest_path: uploadPath.relativePath,
					success: true
				};

				filesUploaded.push(f);
			}

			res.json({
				files: filesUploaded,
				message: `${files.length} file(s) uploaded successfully`,
				success: true
			});

		} else {
			res.status(400).json({
				message: 'Destination directory does not exists',
				path: uploadPath.relativePath,
				success: false
			});
		}
	} catch (err) {
		next(err);
	}

});


module.exports = router;