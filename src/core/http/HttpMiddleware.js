
import {Router} from '../routing/Router';

var router = Router.instance();
var url = require('url');

export function HTTPMiddleware(req, res, next) {
    var parsedUrl = url.parse(req.url);
    var queryParams = parseQueryParams(parsedUrl.query);

    // Add query params to the Request object which
    // will be passed to the controller as the last parameter
    // after the path parameters
    req.params = queryParams;

    // get the response function from the controller
    var resFn = router.callRoute(parsedUrl.pathname, req);

    if (resFn) {
        // execute response function
        resFn(res);
    }

    next();
}

function parseQueryParams(query) {
    var keyValueParts = query.split('&');
    var params = {};

    keyValueParts.forEach(function (keyValue) {
        var parts = keyValue.split('=');
        var key = parts[0];
        var value = parts[1];

        params[key] = value;
    });

    return params;
}
