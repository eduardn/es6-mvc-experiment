import {Router} from './Router';

export function Route(routeName) {
    if (typeof routeName !== 'string') {
        throw new Error('Route name must be string');
    }

    if (routeName === '') {
        throw new Error('Route name cannot be empty');
    }

    return function(target, name, descriptor) {
        var ctrlName = target.constructor.name;
        var router = Router.instance();

        router.addRoute(routeName, ctrlName, name);
    }
}
