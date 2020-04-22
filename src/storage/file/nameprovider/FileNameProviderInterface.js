import ImplementationError from '../../../lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class FileNameProviderInterface
 */
export default class FileNameProviderInterface {
    /**
     * @abstract
     * @param {FileData} fileData
     * @return {string}
     */
    // eslint-disable-next-line no-unused-vars
    getName(fileData) {
        throw new ImplementationError(this, 'getName');
    }
}
