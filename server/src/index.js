const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const getPath = require('./lib/getPath');

const port = process.env.PORT || 5000;

// Initializations
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Main page cloud'));
app.use('/content', require('./routes/content'));
app.use('/mkdir', require('./routes/mkdir'));
app.use('/upload', require('./routes/upload'));

// Fire the server up
app.listen(port, () => {
	console.log('Magic happens on:', port);
});