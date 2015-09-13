import {Container} from './Container';

var container = Container.instance();

export function Inject(...deps) {
    deps = deps.map(function (dep) {
        return container.get(dep.name, dep);
    });

    return function(target) {
        return container.injectConstructor(target, deps);
    }
}
