import ImplementationError from '../../../lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class FileTypeInterface
 */
export default class FileTypeInterface {
    /**
     * @abstract
     * @return {string}
     */
    getType() {
        throw new ImplementationError(this, 'getType');
    }

}
