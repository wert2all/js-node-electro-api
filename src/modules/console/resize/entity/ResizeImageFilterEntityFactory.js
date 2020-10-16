import ImageFilterEntityFactoryInterface from "../../../../lib/console/gulp/image/ImageFilterEntityFactoryInterface";
import UserFilesEntity from "../../../../data/entity/UserFilesEntity";

/**
 * @class ResizeImageFilterEntityFactory
 * @extends ImageFilterEntityFactoryInterface
 * @type ImageFilterEntityFactoryInterface
 */
export default class ResizeImageFilterEntityFactory extends ImageFilterEntityFactoryInterface {
    /**
     *
     * @return {UserFilesEntity}
     */
    factory() {
        return new UserFilesEntity();
    }
}
