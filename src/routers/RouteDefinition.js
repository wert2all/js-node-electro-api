/**
 * @class RouteDefinition
 */
export default class RouteDefinition {
    /**
     *
     * @param {string} route
     * @param {string} method
     * @param {RequestInterface} requestClass
     */
    constructor(route, method, requestClass) {
        /**
         *
         * @type {string}
         */
        this.route = route;
        /**
         *
         * @type {string}
         */
        this.method = method;
        /**
         *
         * @type {RequestInterface}
         */
        this.requestClass = requestClass;
    }
}
