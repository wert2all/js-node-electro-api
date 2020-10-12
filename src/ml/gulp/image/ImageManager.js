import IImageManager from "./IImageManager";
import ImagesValues from "../../../data/entity/ext/ImagesValues";
import ExtendedValuesEntity from "../../../data/entity/ExtendedValuesEntity";
import UserFilesDefinition from "../../../db/definition/UserFilesDefinition";

/**
 * @class ImageManager
 * @type IImageManager
 * @extends IImageManager
 */
export default class ImageManager extends IImageManager {
    /**
     *
     * @param {UserFilesEntity} fileEntity
     * @param {ExtendedValuesEntityManager} em
     */
    constructor(fileEntity, em) {
        super();
        /**
         *
         * @type {UserFilesEntity}
         * @private
         */
        this._fileEntity = this._fillEmptyEntityData(fileEntity);
        /**
         *
         * @type {ExtendedValuesEntityManager}
         * @private
         */
        this._em = em;
    }

    /**
     *
     * @return {boolean}
     */
    canProcess() {
        /**
         *
         * @type {ExtendedValuesEntity}
         */
        const extEntity = this._fileEntity.getExtensionEntity();
        const isProcess = extEntity.getValue(ImagesValues.IS_PROGRESS);
        if (isProcess != null) {
            return isProcess === "n";
        }

        return true;
    }

    /**
     *
     * @param {UserFilesEntity} fileEntity
     * @return {UserFilesEntity}
     * @private
     */
    _fillEmptyEntityData(fileEntity) {
        if (fileEntity.getExtensionEntity() === null) {
            const extEntity = ExtendedValuesEntity.createExtended(
                ImagesValues.TYPE,
                fileEntity.getValue(UserFilesDefinition.COLUMN_ID)
            );
            extEntity.setValue(ImagesValues.IS_PROGRESS, "n");
            fileEntity.setExtensionEntity(extEntity);
        }
        return fileEntity;
    }

    /**
     *
     * @return {Promise<void>}
     */
    async startProcess() {
        this._fileEntity.getExtensionEntity().setValue(ImagesValues.IS_PROGRESS, "y");
        await this._em.save(this._fileEntity.getExtensionEntity());
        return Promise.resolve();
    }

    /**
     *
     * @return {Promise<void>}
     */
    async stopProcess() {
        this._fileEntity.getExtensionEntity().setValue(ImagesValues.IS_PROGRESS, "n");
        await this._em.save(this._fileEntity.getExtensionEntity());
        return Promise.resolve();
    }

    /**
     *
     * @param {ImageResult|null} result
     * @return {IImageManager}
     */
    setResult(result) {
        return this;
    }
}
