import ProcessorFactoryInterface from "../../../lib/console/gulp/processor/ProcessorFactoryInterface";

/**
 * @class ResizeProcessorFactory
 * @extends ProcessorFactoryInterface
 * @type ProcessorFactoryInterface
 */
export default class ResizeProcessorFactory extends ProcessorFactoryInterface {
    /**
     * @param {UserFilesEntity} entity
     * @return {ProcessorInterface|null}
     */
    create(entity) {
        return null;
    }
}
