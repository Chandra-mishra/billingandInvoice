const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./routes/user")
const Product = require("./routes/product")
const Bill = require('./routes/bill')
const Invoice = require('./routes/invoice')
const passport = require('passport')
const session = require('express-session')

require("dotenv").config();
const authMiddleware = require('./middleware/auth')
const cors = require("cors");


//connect to mongoDB
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo database");
});

mongoose.connection.on("error", (err) => {
  console.log("Error at mongoDB: " + err);
});

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',User)
app.use('/product',Product)
app.use('/bill',Bill)
app.use('/invoice',Invoice)

// app.use(authMiddleware)
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }))

// app.get('/auth/google', passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login'] }));
// app.get('/auth/google/callback',passport.authenticate('google',{ failureRedirect: '/login' }),
// function(req, res) {
//   res.redirect('/')});

let server = http.createServer(app);

app.use(function (err, req, res, next) {
  res.status(404).json(err);
});

server.listen(port, () => {
  console.log(`Server is starting at ${port}`);
});
