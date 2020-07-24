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
     */
    // eslint-disable-next-line no-unused-vars
    click(imageData) {
        throw new ImplementationError(this, 'click');
    }
}
