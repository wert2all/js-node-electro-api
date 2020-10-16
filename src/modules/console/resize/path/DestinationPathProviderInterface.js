/**
 * @interface
 * @abstract
 * @class DestinationPathProviderInterface
 */
export default class DestinationPathProviderInterface {
    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @param {ResizeConfig|null} size
     * @return string
     */
    provide(entity, size = null) {}
}
