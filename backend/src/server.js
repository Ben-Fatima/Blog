import http from 'http';
import {router} from "./router.js";

const server = http.createServer((req, res) => {
    router.route(req, res);
});

router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
});

server.listen(3000, () => {
    console.log('Server listening on port 3000...');
});
