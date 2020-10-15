import ProcessorFactoryInterface from "../../../lib/console/gulp/processor/ProcessorFactoryInterface";
import ResizeProcessor from "./ResizeProcessor";

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
        return new ResizeProcessor();
    }
}
