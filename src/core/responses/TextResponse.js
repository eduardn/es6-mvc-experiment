/**
 * Response class for any kind of text data.
 *
 * @file: TextResponse.js
 *
 * @author: Eduard Neculaesi <neculaesi.eduard@gmail.com>
 * @since: 0.1
 */

export class TextResponse {
    static send(content) {
        return function(res) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(content);
        }
    }
}
