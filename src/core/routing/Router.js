/**
 * Main router class. This will be a singleton the entire
 * application lifecycle.
 *
 * @file: Router.js
 *
 * @author: Eduard Neculaesi <neculaesi.eduard@gmail.com>
 * @since: 0.1
 */

export class Router {
    // Make router a singleton
    static instance() {
        if (Router.newInstance) {
            return Router.newInstance;
        }

        Router.newInstance = new Router();
        return Router.newInstance;
    }

    constructor() {
        this.routes = [];
    }

    /**
     * Adds a route to the list of available routes.
     *
     * @param {String} route      Route path
     * @param {String} controller Controller name
     * @param {String} action     Name of the function to be executed when
     *                            route is intercepted
     * @param {String} method     HTTP Method of this route
     */
    addRoute(route, controller, action, method) {
        var routeMatcher = this.buildRouteMatcher(route);
        this.routes.push({
            method: method,
            name: route,
            controller: controller,
            action: action,
            matcher: routeMatcher
        });
    }

    /**
     * Calls a controller function based on the route and method
     * of the request.
     *
     * @param  {String}   path Route from the url
     * @param  {Object}   req  Request object used to get the HTTP Method
     *
     * @return {function}      A response function
     */
    callRoute(path, req) {
        var route = null;
        var method = req.method;

        this.routes.forEach(function (r) {
            var matches = r.matcher.exec(path);

            if (matches && matches[0] === path && r.method === method) {
                route = r;
            }
        });

        if (!route) {
            console.error('No route found for', path);
            return;
        }

        // Get all the path parameters
        var params = this.getParameterValues(route, path);

        // Add req as the last parameter of the function
        params.push(req);

        var ctrlFn = (require('../../controllers/' + route.controller)[route.controller]);
        var ctrl = new ctrlFn();
        var routeFunction = ctrl[route.action];

        // TODO: Check for a funciton instead of truthy
        if (!routeFunction) {
            console.error('No function found for ', route.controller + '#' + route.action);
            return;
        }

        return ctrl[route.action](...params);
    }

    /**
     * Gets the parameter values from the path based on
     * the route's definition.
     *
     * @param  {Object} route The matched route
     * @param  {String} path  Route from the request url
     *
     * @return {Object}       An array with the parameter values in the
     *                        route definition order.
     */
    getParameterValues(route, path) {
        var routeParts = route.name.split('/');
        var pathParts = path.split('/');
        var paramIndexes = [];

        routeParts.forEach(function (part, index) {
            if (part.charAt(0) === ':') {
                paramIndexes.push(index);
            }
        })

        return paramIndexes.map(function (paramIndex) {
            return pathParts[paramIndex];
        })
    }

    /**
     * Builds a regex for matching the provided route.
     *
     * @param  {String} route A string definition for a route
     *
     * @return {RegExp}       A regexp that will match the string definition
     */
    buildRouteMatcher(route) {
        // Strip first '/' if present
        if (route.charAt(0) === '/') {
            route = route.slice(1, route.length);
        }

        var parts = route.split('/');
        var matcherParts = parts.map(function (routePart, index) {

            var beginning = index === 0 ? '\/' : '';

            if (routePart.charAt(0) === ':') {
                // A path param is defined so create
                // a default matcher for it
                // TODO: Add support for custom matchers
                return beginning + '([a-zA-Z0-9])+\/?';
            } else {
                return beginning + routePart + '\/?';
            }
        });

        return new RegExp(matcherParts.join(''));
    }
}
