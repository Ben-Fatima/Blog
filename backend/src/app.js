import http from 'http';
import {router} from "./router.js";

const app = http.createServer((req, res) => {
    router.route(req, res);
    router.use((req, res) => {
        console.log(`Received a ${req.method} request for ${req.url}`);
    });
});

router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
});

router.get('/home', (req, res)=>{
    res.end('Home page!\n');
})

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});
