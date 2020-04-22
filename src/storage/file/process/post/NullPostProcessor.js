import FilePostProcessorInterface from './FilePostProcessorInterface';

/**
 * @class NullPostProcessor
 * @extends FilePostProcessorInterface
 * @type FilePostProcessorInterface
 */
export default class NullPostProcessor extends FilePostProcessorInterface {
    /**
     *
     * @param {FileData} fileData
     * @return {Promise<FileData>}
     */
    // eslint-disable-next-line no-unused-vars
    async postProcess(fileData) {
        return Promise.resolve(fileData);
    }
}
