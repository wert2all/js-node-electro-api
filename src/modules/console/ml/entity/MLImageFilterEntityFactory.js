import ImageFilterEntityFactoryInterface from "../../../../lib/console/gulp/image/ImageFilterEntityFactoryInterface";
import UserFilesEntity from "../../../../data/entity/UserFilesEntity";

/**
 * @class MLImageFilterEntityFactory
 * @extends ImageFilterEntityFactoryInterface
 * @type ImageFilterEntityFactoryInterface
 */
export default class MLImageFilterEntityFactory extends ImageFilterEntityFactoryInterface {
    /**
     *
     * @return {UserFilesEntity}
     */
    factory() {
        return new UserFilesEntity().setReady(true);
    }
}
