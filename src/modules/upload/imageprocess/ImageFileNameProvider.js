// eslint-disable-next-line max-len
import FileNameProviderInterface from "../../../storage/file/nameprovider/FileNameProviderInterface";
import UserDefinition from "../../../db/definition/UserDefinition";

/**
 * @class ImageFileNameProvider
 * @type FileNameProviderInterface
 * @extends FileNameProviderInterface
 */
export default class ImageFileNameProvider extends FileNameProviderInterface {
    /**
     *
     * @param {UserFilesEntity} userFiles
     */
    constructor(userFiles) {
        super();
        /**
         *
         * @type {string|null}
         * @private
         */
        this._userID = userFiles.getUser().getValue(UserDefinition.COLUMN_GOOGLE_ID);
    }

    /**
     *
     * @param {FileData} fileData
     * @return {string}
     */
    getName(fileData) {
        return this._userID + "_" + fileData.getName();
    }
}
