// eslint-disable-next-line max-len
import ImplementationError from "../../../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class FilePostProcessorInterface
 */
export default class FilePostProcessorInterface {
    /**
     * @abstract
     * @param {FileData} fileData
     * @return {Promise<FileData>}
     */
    // eslint-disable-next-line no-unused-vars
    async postProcess(fileData) {
        throw new ImplementationError(this, "postProcess");
    }
}
