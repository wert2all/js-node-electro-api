import ImplementationError from '../../../lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class FileProcessInterface
 */
export default class FileProcessInterface {
    /**
     *
     * @param {FileData}fileData
     * @param {FileNameProviderInterface} fileNameProvider
     * @return {Promise<FileData>}
     */
    // eslint-disable-next-line no-unused-vars
    async process(fileData, fileNameProvider) {
        throw new ImplementationError(this, 'process');
    }
}
