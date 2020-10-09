import ImplementationError from "../../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class FileProcessInterface
 */
export default class FileProcessInterface {
    /**
     * @abstract
     * @param {FileData}fileData
     * @param {FileNameProviderInterface} fileNameProvider
     * @return {Promise<FileData>}
     */
    // eslint-disable-next-line no-unused-vars
    async process(fileData, fileNameProvider) {
        throw new ImplementationError(this, "process");
    }

    /**
     * @abstract
     * @param {FileTypeInterface} type
     * @return {boolean}
     */
    // eslint-disable-next-line no-unused-vars
    checkType(type) {
        throw new ImplementationError(this, "checkType");
    }

    /**
     * @abstract
     * @param {FileStorageConfig} config
     */
    // eslint-disable-next-line no-unused-vars
    setConfig(config) {
        throw new ImplementationError(this, "setConfig");
    }
}
