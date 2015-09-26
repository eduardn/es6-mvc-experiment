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
