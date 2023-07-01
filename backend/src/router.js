import url from 'url';

export const router = {
    /**
     * An object that stores all the registered routes, with keys in the format 'method: path'
     * @type {Object}
     */
    routes: {},

    /**
     * An array to store all registered middleware functions
     * @type {Array}
     */
    middlewares: [],

    /**
     * Register a handler for a GET request to a specific path
     * @param {string} path - The path for the route
     * @param {function} handler - The function to handle the request
     */
    get(path, handler) {
        this.routes['GET' + path] = handler
    },

    /**
     * Register a handler for a POST request to a specific path
     * @param {string} path - The path for the route
     * @param {function} handler - The function to handle the request
     */
    post(path, handler) {
        this.routes['POST' + path] = handler
    },

    /**
     * Register a handler for a PUT request to a specific path
     * @param {string} path - The path for the route
     * @param {function} handler - The function to handle the request
     */
    put(path, handler) {
        this.routes['PUT' + path] = handler
    },

    /**
     * Register a handler for a DELETE request to a specific path
     * @param {string} path - The path for the route
     * @param {function} handler - The function to handle the request
     */
    delete(path, handler) {
        this.routes['DELETE' + path] = handler
    },

    /**
     * Register a middleware function that will be run on every request before the route handler
     * @param {function} middleware - The middleware function to register
     */
    use(middleware) {
        this.middlewares.push(middleware)
    },

    /**
     * Route an incoming request to the appropriate handler
     * @param {Object} req - The incoming request object
     * @param {Object} res - The response object
     */
    route(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname
        const method = req.method

        const handler = this.routes[method + path]

        for (const middleware of this.middlewares) {
            middleware(req, res)
        }

        if (handler) {
            handler(req, res)
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Sorry the requested page not Found\n')
        }
    }
}


