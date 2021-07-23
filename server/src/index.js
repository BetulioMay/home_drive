const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const getPath = require('./lib/getPath');
const fileUpload = require('express-fileupload');
const enoent = require('./middlewares/errors/enoent');
const err = require('./middlewares/errors/err');

const port = process.env.PORT || 80;

// Initializations
const app = express();


// Middlewares
app.use(morgan('dev'));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());

// Routes
app.get('/', (req, res) => res.send('Main page cloud'));
app.use('/content', require('./routes/content'));
app.use('/dir', require('./routes/dir'));
app.use('/upload', require('./routes/upload'));
app.use('/download', require('./routes/download'));

// Errors
app.use(enoent);
app.use(err);


// Fire the server up
app.listen(port, '0.0.0.0', () => {
	console.log('Magic happens on:', port);
});