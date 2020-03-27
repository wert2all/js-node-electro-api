import RoutersInterface from './RoutersInterface';

export default class Route extends RoutersInterface {
    /**
     *
     * @param {string} route
     * @param {RequestInterface} request
     */
    constructor(route, request) {
        super();
        this.route = route;
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
