import ImageFilterEntityFactoryInterface from "../../../../lib/console/gulp/image/ImageFilterEntityFactoryInterface";
import UserFilesEntity from "../../../../data/entity/UserFilesEntity";

/**
 * @class WatchFileFilterEntityFactory
 * @extends ImageFilterEntityFactoryInterface
 * @type ImageFilterEntityFactoryInterface
 */
export default class WatchFileFilterEntityFactory extends ImageFilterEntityFactoryInterface {
    /**
     *
     * @param {string} filePath
     */
    constructor(filePath) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._filePath = filePath;
    }

    factory() {
        const entity = new UserFilesEntity();
        entity.setFilePath(this._filePath);
        return entity;
    }
}
