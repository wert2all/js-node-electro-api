import FileNameProviderInterface from './FileNameProviderInterface';

/**
 * @class DefaultFileNameProvider
 * @type FileNameProviderInterface
 * @extends FileNameProviderInterface
 */
export default class DefaultFileNameProvider extends FileNameProviderInterface {
    /**
     *
     * @param {FileData} fileData
     * @return {string}
     */
    getName(fileData) {
        return fileData.getName();
    }
}
