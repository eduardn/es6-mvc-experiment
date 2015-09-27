
/**
 * Simple connect middleware that reads the body of the request
 * before the routing is done and creates a new property on the
 * request object with the body data.
 */
export function HTTPBodyMiddleware(req, res, next) {
    req.body = '';

    req.on('data', function (chunk) {
        req.body += chunk;
    });

    req.on('end', function () {
        next();
    });
}
