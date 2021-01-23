import ImplementationErrorInterface from "./ImplementationErrorInterface";

/**
 * @class ImplementationError
 * @type ImplementationErrorInterface
 * @extends ImplementationErrorInterface
 */
export default class ImplementationError extends ImplementationErrorInterface {
    /**
     *
     * @param {object} object
     * @param {string} methodName
     */
    constructor(object, methodName) {
        super("Implement " + object.constructor.name + "." + methodName);
    }
}
