/**
 * @interface
 * @abstract
 * @class ImageUrlProviderInterface
 */
export default class ImageUrlProviderInterface {
    /**
     * @abstract
     * @param {UserFilesEntity} imageEntity
     * @return {string}
     */
    provide(imageEntity) {}
}
