import ImplementationError from "../../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class ProcessorFactoryInterface
 */
export default class ProcessorFactoryInterface {
    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @return {ProcessorInterface|null}
     */
    create(entity) {
        throw new ImplementationError(this, "create");
    }
}
