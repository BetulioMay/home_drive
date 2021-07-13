

const enoent = (err, req, res, next) => {
	err.message = 'File or directory not found.';
	err.statusCode = 400;

	next(err);
}

module.exports = enoent;