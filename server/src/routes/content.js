const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('This is the content endpoint');
})

module.exports = router;