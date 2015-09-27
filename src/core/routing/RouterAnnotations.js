/**
 * Route annotation for making a controller function respond to
 * a certain route.
 *
 * @file: RouterAnnotation.js
 *
 * @author: Eduard Neculaesi <neculaesi.eduard@gmail.com>
 * @since: 0.1
 */

import {Router} from './Router';

/**
 * Available HTTP Methods for the route annotation.
 *
 * @type {Array}
 */
var availableMethods = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
];

/**
 * Route annotation function.
 *
 * @param {String} method    HTTP Method for this route
 * @param {String} routeName A route string definition
 */
export function Route(method, routeName) {

    if (availableMethods.indexOf(method) === -1) {
        routeName = method;
        method = 'GET';
    }

    if (typeof routeName !== 'string') {
        throw new Error('Route name must be string');
    }

    if (routeName === '') {
        throw new Error('Route name cannot be empty');
    }

    return function(target, name, descriptor) {
        var ctrlName = target.constructor.name;
        var router = Router.instance();

        router.addRoute(routeName, ctrlName, name, method);
    }
}
