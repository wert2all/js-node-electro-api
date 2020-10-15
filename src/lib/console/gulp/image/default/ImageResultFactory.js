import ImageResultFactoryInterface from "../ImageResultFactoryInterface";
import ImageResult from "./ImageResult";

/**
 * @class ImageResultFactory
 * @extends ImageResultFactoryInterface
 * @type ImageResultFactoryInterface
 */
export default class ImageResultFactory extends ImageResultFactoryInterface {
    create() {
        return new ImageResult();
    }
}
