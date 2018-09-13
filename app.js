const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
const mongoose   = require('mongoose');

// const route = require('./routes');
// const quotes = require('./routes/quotesRoute');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use('/',route);
// app.use('/quotes',quotes);


//Mongoose
// const url = 'mongodb://localhost:27017/e-commerce';
const mlabUser = process.env.MLAB_USER;
const mlabPass = process.env.MLAB_PASS;

const url = `mongodb://${mlabUser}:${mlabPass}@ds253922.mlab.com:53922/live-code`;
mongoose.connect(url,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to the database');
});

app.listen(port,()=>{
  console.log(`application is on port:${port}`);
});