import DefaultFileNameProvider from './file/nameprovider/DefaultFileNameProvider';
import ErrorFileStorageProcessType from './file/error/ErrorFileStorageProcessType';
import FileProcessFactory from './file/FileProcessFactory';
import NullPostProcessor from './file/process/post/NullPostProcessor';

/**
 * @class FileStorage
 */
export default class FileStorage {
    /**
     *
     * @param {FileStorageConfig} config
     */
    constructor(config) {
        /**
         *
         * @type {FileStorageConfig}
         * @private
         */
        this._config = config;
        /**
         *
         * @type {FileProcessFactory}
         * @private
         */
        this._fileProcessorFactory = new FileProcessFactory();
    }

    /**
     *
     * @return {FileStorageConfig}
     */
    getConfig() {
        return this._config;
    }

    /**
     *
     * @param {FileData} fileData
     * @param {FileNameProviderInterface} fileNameProvider
     * @param {FilePostProcessorInterface} postProcessor
     * @return {Promise<FileData>}
     */
    async moveFile(fileData,
                   fileNameProvider = new DefaultFileNameProvider(),
                   postProcessor = new NullPostProcessor()
    ) {
        /**
         *
         * @type {FileProcessInterface|boolean}
         */
        const fileProcessor = this._fileProcessorFactory
            .create(fileData.getType());
        if (fileProcessor === false) {
            return Promise.reject(new ErrorFileStorageProcessType());
        }
        fileProcessor.setConfig(this._config);
        fileData = await fileProcessor.process(fileData, fileNameProvider);
        fileData = await postProcessor.postProcess(fileData);
        return Promise.resolve(fileData);
    }
}
