require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//MongoDB
const mongoose = require('mongoose');
const connectionStr = process.env.DB_CONNECTION_STRING;

const connection = mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log('MongoDB connected');
});

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routing
const Routes = require('./routes');

app.use('/user', Routes.userRouter);
app.use('/document', Routes.documentRouter);
app.use('/header', Routes.headerRouter);
app.use('/data', Routes.dataRouter);

const PORT = process.env.PORT || '4000';
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
