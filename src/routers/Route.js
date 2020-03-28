import RoutersInterface from './RoutersInterface';

export default class Route extends RoutersInterface {
    /**
     *
     * @param {string} route
     * @param {string} method
     * @param requestClass
     * @param {StorageProvider} storageProvider
     */
    constructor(route, method, requestClass, storageProvider) {
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
        this.request = new requestClass(storageProvider);
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
