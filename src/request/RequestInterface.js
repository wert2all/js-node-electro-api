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
    // eslint-disable-next-line no-unused-vars
    createResponse(request) {
        throw Error('Implement RequestInterface:createResponse');
    }
}
