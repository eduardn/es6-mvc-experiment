/**
 * Main application file. When run it loads all the middlewares and
 * controllers
 *
 * @file: app.js
 *
 * @author: Eduard Neculaesi <neculaesi.eduard@gmail.com>
 * @since: 0.1
 */

import {HTTPBodyMiddleware} from './core/http/middlewares/HttpBodyMiddleware';
import {HTTPRoutingMiddleware} from './core/http/middlewares/HttpRoutingMiddleware';

// Import application controllers
import {UsersController} from './controllers/UsersController';

// Require and instantiate connect
var connect = require('connect');
var app = connect();

// Add middleware for parsing the body of the request
app.use(HTTPBodyMiddleware);
// Add middleware for passing requests to the router instance
app.use(HTTPRoutingMiddleware);

// Start the server on port 3000
// TODO: Make this customizable
app.listen(3000);
