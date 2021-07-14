
const enoent = (err, req, res, next) => {
	if (err.code !== 'ENOENT') return false;
	err.message = 'File or directory not found.';
	err.statusCode = 400;

	next(err);
}

module.exports = enoent;