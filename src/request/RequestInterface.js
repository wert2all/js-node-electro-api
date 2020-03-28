/**
 * @class RequestInterface
 * @type RequestInterface
 * @abstract
 */
export default class RequestInterface {
    /**
     * @request {*} request
     * @return {Promise}
     * @public
     * @abstract
     */
    createResponse(request) {
        throw Error('Implement RequestInterface:createResponse');
    }
}
