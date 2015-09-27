/**
 * A DI Container that holds all of the injected dependencies instances.
 * A dependency is instantiated only the first time is required.
 *
 * @file: Container.js
 *
 * @author: Eduard Neculaesi <neculaesi.eduard@gmail.com>
 * @since: 0.1
 */

export class Container {
    // Make container a singleton
    static instance() {
        if (Container.newInstance) {
            return Container.newInstance;
        }

        Container.newInstance = new Container();

        return Container.newInstance;
    }

    constructor() {
        this.instances = {};
    }

    /**
     * Gets a dependecy by name or instantiates it.
     *
     * @param  {string}   depName  Constructor function name
     * @param  {function} depClass Constuctor function of the dependency
     *
     * @return {Object}            Dependency Instance
     */
    get(depName, depClass) {
        var instance = this.instances[depName];
        if (instance) {
            return instance;
        }

        instance = new depClass();
        this.instances[depName] = instance;

        return instance;
    }

    injectConstructor(target, deps) {
        return function(...args) {
            var finalArgs = deps.concat(args);

            return new target(...finalArgs);
        }
    }
}
