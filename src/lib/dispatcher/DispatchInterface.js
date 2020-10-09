import ImplementationError from "../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class DispatchInterface
 */
export default class DispatchInterface {
    /**
     * @abstract
     * @param {EventInterface} event
     * @return {Promise<*>}
     */
    // eslint-disable-next-line no-unused-vars
    dispatch(event) {
        throw new ImplementationError(this, "dispatch");
    }
}
