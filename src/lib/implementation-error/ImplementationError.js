import ImplementationErrorInterface from './ImplementationErrorInterface';

export default class ImplementationError extends ImplementationErrorInterface {
    /**
     *
     * @param {object} object
     * @param {string} methodName
     */
    constructor(object, methodName) {
        super('Implement ' + object.constructor.name + '.' + methodName);
    }

}
