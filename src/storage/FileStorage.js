import path from 'path';
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
     * @param {string} storagePath
     * @param {string} tmpSubDirectory
     */
    constructor(storagePath, tmpSubDirectory = 'tmp') {
        /**
         *
         * @type {string}
         * @private
         */
        this._storagePath = storagePath;
        /**
         *
         * @type {string}
         * @private
         */
        this._tmpPath = path.normalize(
            this._storagePath + path.sep + tmpSubDirectory + path.sep
        );

        /**
         *
         * @type {FileProcessFactory}
         * @private
         */
        this._fileProcessorFactory = new FileProcessFactory();
    }

    /**
     *
     * @return {string}
     */
    getTmpDirectory() {
        return this._tmpPath;
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
        const fileProcessor = this._fileProcessorFactory.create(fileData.getType());
        if (fileProcessor === false) {
            return Promise.reject(new ErrorFileStorageProcessType());
        }

        fileData = await fileProcessor.process(fileData, fileNameProvider);
        fileData = await postProcessor.postProcess(fileData);
        return Promise.resolve(fileData);
    }
}
