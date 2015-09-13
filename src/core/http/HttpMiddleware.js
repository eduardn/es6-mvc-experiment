
import {Router} from '../routing/Router';

var router = Router.instance();
var url = require('url');

export function HTTPMiddleware(req, res, next) {
    var parsedUrl = url.parse(req.url);

    router.callRoute(parsedUrl.pathname, res);

    res.end();
    next();
}
