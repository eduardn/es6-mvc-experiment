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
