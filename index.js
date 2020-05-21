const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path: './config/dev.env'});

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({}));
app.use('/public', express.static(__dirname + '/public'));

const port = process.env.PORT || 80;
const mongoose = require('mongoose');
const database = mongoose.connect(process.env.DB_URI);


const router = require('./app.router');
router(app);

app.listen(port, () => {
   console.log(`Server running on port ${port}, in ${process.env.NODE_ENV} mode`);
});

