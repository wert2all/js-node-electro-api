import RoutersInterface from "./RoutersInterface";

export default class Route extends RoutersInterface {
    /**
     *
     * @param {string} route
     * @param {string} method
     * @param {RequestInterface} request
     */
    constructor(route, method, request) {
        super();
        /**
         *
         * @type {string}
         */
        this.route = route;
        this.method = method;
        /**
         *
         * @type {RequestInterface}
         */
        this.request = request;
    }

    /**
     * @return {string}
     */
    getURL() {
        return this.route;
    }

    /**
     * @return {RequestInterface}
     */
    getRequest() {
        return this.request;
    }
}
