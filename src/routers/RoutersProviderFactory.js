import Route from "./Route";
import RoutersProvider from "./RoutersProvider";

/**
 * @class RoutersProviderFactory
 */
export default class RoutersProviderFactory {
    /**
     *
     * @param {RouteDefinition[]} routeDefinitions
     */
    constructor(routeDefinitions) {
        this._routeDefinitions = routeDefinitions;
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return RoutersProvider
     */
    create(dispatcher) {
        return new RoutersProvider(
            this._routeDefinitions.map(
                (routeDefinition) =>
                    new Route(
                        routeDefinition.route,
                        routeDefinition.method,
                        routeDefinition.requestClass.init(dispatcher)
                    )
            )
        );
    }
}
