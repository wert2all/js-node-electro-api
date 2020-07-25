import ImplementationError from '../../../../../../src/lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class UIImageActionInterface
 */
export default class UIImageActionInterface {
    /**
     * @abstract
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     */
    // eslint-disable-next-line no-unused-vars
    click(imageData, elementList = null) {
        throw new ImplementationError(this, 'click');
    }
}
