import {Router} from './Router';

var availableMethods = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
];

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
