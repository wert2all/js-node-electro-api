/**
 * @class RoutersInterface
 * @type RoutersInterface
 * @abstract
 */
export default class RoutersInterface {
    /**
     * @return {string}
     * @abstract
     */
    getURL() {
        throw Error("Implement RoutersInterface:getURL");
    }

    /**
     * @return {RequestInterface}
     * @abstract
     */
    getRequest() {
        throw Error("Implement RoutersInterface:getRequest");
    }
}
