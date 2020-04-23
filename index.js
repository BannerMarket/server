const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.port || 3000;
const mongoose = require('mongoose');
const database = mongoose.connect('mongodb://localhost/bmarketdev');


const router = require('./app.router');
router(app);

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
