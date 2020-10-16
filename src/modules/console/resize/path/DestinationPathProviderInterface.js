/**
 * @interface
 * @abstract
 * @class DestinationPathProviderInterface
 */
export default class DestinationPathProviderInterface {
    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @param {SizeConfig|null} size
     * @return string
     */
    provide(entity, size = null) {}
}
