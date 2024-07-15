require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
  secret: "my secret key", // session ID
  saveUninitialized: true,
  resave: false,
  })
);

app.use((req, res, next) =>{
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
  
});

mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

const studentRoutes = require('./src/routes/studentRoutes');
app.use('', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
