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

    addRoute(route, controller, action) {
        var routeMatcher = this.buildRouteMatcher(route);
        this.routes.push({
            name: route,
            controller: controller,
            action: action,
            matcher: routeMatcher
        });
    }

    callRoute(path) {
        var route = null;

        this.routes.forEach(function (r) {
            var matches = r.matcher.exec(path);

            if (matches && matches[0] === path) {
                route = r;
            }
        });

        if (!route) {
            console.error('No route found for', path);
            return;
        }

        var params = this.getParameterValues(route, path);
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
