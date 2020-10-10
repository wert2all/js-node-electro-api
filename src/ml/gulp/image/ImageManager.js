import IImageManager from "./IImageManager";
import ImagesValues from "../../../data/entity/ext/ImagesValues";

/**
 * @class ImageManager
 * @type IImageManager
 * @extends IImageManager
 */
export default class ImageManager extends IImageManager {
    /**
     *
     * @param {UserFilesEntity} fileEntity
     */
    constructor(fileEntity) {
        super();
        /**
         *
         * @type {UserFilesEntity}
         * @private
         */
        this._fileEntity = fileEntity;
    }

    canProcess() {
        /**
         *
         * @type {ExtendedValuesEntity}
         */
        const extEntity = this._fileEntity.getExtensionEntity();
        if (extEntity !== null) {
            const isProcess = extEntity.getValue(ImagesValues.IS_PROGRESS);
            if (isProcess != null) {
                return isProcess === "n";
            }
        }
        return true;
    }
}
