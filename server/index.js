require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const employeeRoute = require('./routes/employeeRoute');
const leaveRoute = require('./routes/leaveRoute');



const app = express();

const port = config.server.port;
const dbURL = config.db.dbUrl;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE',   // Allow these HTTP methods
  optionsSuccessStatus: 200         // Some legacy browsers (IE11, various SmartTVs) choke on 204
};*/

app.use(cors());

app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/employee', employeeRoute);
app.use('/leave', leaveRoute);

mongoose.connect(dbURL).then(() => {
    console.log('Database was connected');
}).catch((err) => {
    console.log('Database was not connected, Error orccured: ');
    console.log(err);
})

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})

module.exports = app;