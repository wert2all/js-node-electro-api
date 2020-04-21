import RoutersInterface from './RoutersInterface';

export default class Route extends RoutersInterface {
    /**
     *
     * @param {string} route
     * @param {string} method
     * @param RequestClass
     * @param {StorageProvider} storageProvider
     */
    constructor(route, method, RequestClass, storageProvider) {
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
        this.request = new RequestClass(storageProvider);
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
