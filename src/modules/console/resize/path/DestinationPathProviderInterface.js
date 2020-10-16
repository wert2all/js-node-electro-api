/**
 * @interface
 * @abstract
 * @class DestinationPathProviderInterface
 */
export default class DestinationPathProviderInterface {
    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @param {SizeConfig} size
     * @return string
     */
    provide(entity, size) {}
}
