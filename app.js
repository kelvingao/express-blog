'use strict';
/*******************************************************************************
 * Copyright (c) 2017 Kelvin Gao.
 *
 * All rights reserved.
 *
 *******************************************************************************/
// API definition
var app = require(__dirname + '/server');

// client
var serve_static = require('serve-static');
app.use(serve_static(__dirname + '/client'));

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

var winston = require('winston');
var logger = new (winston.Logger)({
	level: 'debug',
	transports: [
		new (winston.transports.Console)({ colorize: true }),
	]
});

// start server on port 3000
app.listen(process.env.PORT || 3000);
logger.info('Server started.');