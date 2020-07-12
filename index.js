const express = require('express');
const app = express();
const dotenv = require('dotenv');
const flash = require('express-flash');
const session = require('express-session');

dotenv.config({path: './config/dev.env'});

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const passport = require('passport');
const { initialize } = require('./src/modules/auth/auth.module');

initialize(passport);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({}));
app.use(flash());
app.use(session({secret: 'blablabla', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(__dirname + '/public'));
const port = process.env.PORT || 80;
const mongoose = require('mongoose');
const database = mongoose.connect(process.env.DB_URI);


const router = require('./app.router');
router(app);

app.listen(port, () => {
   console.log(`Server running on port ${port}, in ${process.env.NODE_ENV} mode`);
});

