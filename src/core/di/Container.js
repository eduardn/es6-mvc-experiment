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
