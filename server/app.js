/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var ExpressStormpath = require('express-stormpath');
var path = require('path');
var app = express();
var server = http.createServer(app);

require('./config/express')(app);

app.use(ExpressStormpath.init(app, {
    website: true,
    web: {
        spaRoot: path.join(__dirname, '..', 'client', 'index.html')
    }
}));

require('./routes')(app);

app.on('stormpath.ready', function () {

    console.log('Stormpath Ready');
    // Start server
        
    server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
});

// Expose app
exports = module.exports = app;
