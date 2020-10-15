import RequestInterface from "./RequestInterface";
import ImplementationError from "../../lib/implementation-error/ImplementationError";

/**
 * @abstract
 * @class AbstractAdminRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class AbstractAdminRequest extends RequestInterface {
    createResponse(request) {
        return Promise.resolve(undefined);
    }

    /**
     * @abstract
     * @param {DispatchInterface} dispatcher
     * @return RequestInterface
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        throw new ImplementationError(this, "init");
    }
}
