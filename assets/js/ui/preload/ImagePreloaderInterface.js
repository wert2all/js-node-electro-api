/**
 * @interface
 * @abstract
 * @class ImagePreloaderInterface
 */
export default class ImagePreloaderInterface {
    /**
     * @abstract
     * @param {string} imageUrl
     */
    load(imageUrl) {}

    /**
     * @abstract
     * @param {string} imageUrl
     * @return {Promise<void>|boolean|null}
     */
    getImage(imageUrl) {}
}
