/**
 * Response class for an Object that can be converted to a JSON string.
 * The class adds the correct Content-Type and stringifyes the Object.
 *
 * @file: JsonRespone.js
 *
 * @author: Eduard Neculaesi <neculaesi.eduard@gmail.com>
 * @since: 0.1
 */

export class JsonResponse {
    static send(json) {
        return function(res) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(json));
        }
    }
}
