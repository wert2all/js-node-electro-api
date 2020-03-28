import RoutersInterface from './RoutersInterface';

export default class Route extends RoutersInterface {
    /**
     *
     * @param {string} route
     * @param requestClass
     * @param {StorageProvider} storageProvider
     */
    constructor(route, requestClass, storageProvider) {
        super();
        /**
         *
         * @type {string}
         */
        this.route = route;
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
