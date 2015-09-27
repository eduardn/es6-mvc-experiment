/**
 * Simple connect middleware that reads the body of the request
 * before the routing is done and creates a new property on the
 * request object with the body data.
 *
 * @file: HttpBodyMiddleware.js
 *
 * @author: Eduard Neculaesi <neculaesi.eduard@gmail.com>
 * @since: 0.1
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
