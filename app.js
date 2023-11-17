const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');

const app = express();

var cors = require('cors');

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes);

sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => console.log(err));

