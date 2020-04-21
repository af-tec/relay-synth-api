// server/server.js

'use strict';
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const winston = require('winston');
const https = require('https');
const fs = require('fs');
const passport = require('passport');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const port = 8000;
const host = 'http://localhost'

require('dotenv/config');
require('./auth/auth');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use(helmet());
app.use(cors({credentials: true, origin: true}));

const authRoute = require('./routes/auth_routes');
const usersRoute = require('./routes/user');
const lessonsRoute = require('./routes/tutorial');
const synthsRoute = require('./routes/synth');
const examplesRoute = require('./routes/example');
const leaderboardRoute = require('./routes/leaderboard');




app.use('/',authRoute);
app.use('/user', passport.authenticate('jwt', { session : false }), usersRoute);
app.use('/tutorials', passport.authenticate('jwt', { session : false }),lessonsRoute);
app.use('/synths',passport.authenticate('jwt', { session : false }), synthsRoute);
app.use('/examples', passport.authenticate('jwt', { session : false }),examplesRoute);
app.use('/leaderboard',passport.authenticate('jwt', { session : false }), leaderboardRoute)
app.get(`/`, (req, res) => {
    res.send({
        message: `Hi! Server is listening on ${host}:${port}`
    });
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta:  { service: 'user-service'},
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add( new winston.transports.Console({
        format: winston.format.simple()
    }));
}

mongoose.connect(process.env.DB_CONNECTION,
    {   useCreateIndex: true,
        useNewUrlParser: true,
     useUnifiedTopology: true },
console.log('connected to DB!')
);


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});


app.listen(port, function() {
    console.log(`listening on port 8000! Go to ${host}:${port}`);
});

module.exports = app;
