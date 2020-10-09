import ImplementationError from "../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class RequestInterface
 * @type RequestInterface
 */
export default class RequestInterface {
    /**
     * @abstract
     * @param {DispatchInterface} dispatcher
     * @return RequestInterface
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        throw new ImplementationError(this, "init");
    }

    /**
     * @abstract
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    createResponse(request) {
        throw new ImplementationError(this, "createResponse");
    }
}
