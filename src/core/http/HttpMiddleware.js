
import {Router} from '../routing/Router';

var router = Router.instance();
var url = require('url');

export function HTTPMiddleware(req, res, next) {
    var parsedUrl = url.parse(req.url);

    // get the response function from the controller
    var resFn = router.callRoute(parsedUrl.pathname, res);

    if (resFn) {
        // execute response function
        resFn(res);
    }

    next();
}
