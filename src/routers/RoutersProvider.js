/**
 * @class RoutersProvider
 * @type RoutersProvider
 */
export default class RoutersProvider {

    /**
     *
     * @param {Route[]} routers
     */
    constructor(routers) {
        /**
         *
         * @type {Route[]}
         */
        this.routers = routers;
    }

    /**
     *
     * @return {Route[]}
     */
    fetch() {
        return this.routers;
    }
}
