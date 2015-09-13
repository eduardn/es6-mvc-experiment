import {HTTPMiddleware} from './core/http/HttpMiddleware';

// Import application controllers
import {UsersController} from './controllers/UsersController';

// Require and instantiate connect
var connect = require('connect');
var app = connect();

// Create a simple server using connect
// and add framework's own middleware
app.use(HTTPMiddleware);

// Start the server on port 3000
// TODO: Make this customizable
app.listen(3000);
