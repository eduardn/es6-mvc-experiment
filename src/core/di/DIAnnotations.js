/**
 * DI Annotation for injecting a dependency as a singleton.
 *
 * @file: DIAnnotation.js
 *
 * @author: Eduard Neculaesi <neculaesi.eduard@gmail.com>
 * @since: 0.1
 */

import {Container} from './Container';

// Get the container instance
var container = Container.instance();

/**
 * Inject function that takes a list of dependencies separated by comma.
 *
 * @param {any} ...deps A list of dependencies separated by comma
 */
export function Inject(...deps) {
    deps = deps.map(function (dep) {
        return container.get(dep.name, dep);
    });

    return function(target) {
        return container.injectConstructor(target, deps);
    }
}
