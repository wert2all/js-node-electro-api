import ProcessorFactoryInterface from "../../../lib/console/gulp/processor/ProcessorFactoryInterface";
import ResizeProcessor from "./ResizeProcessor";
import ResizeSizesHolder from "./size/ResizeSizesHolder";
import ResizeDestinationPathProviderFactory from "./path/ResizeDestinationPathProviderFactory";
import RotateDestinationPathProviderFactory from "./path/RotateDestinationPathProviderFactory";
import DI from "../../../lib/di/DI";

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
        return new ResizeProcessor(
            DI.getInstance().get(ResizeSizesHolder),
            new RotateDestinationPathProviderFactory().factory(),
            new ResizeDestinationPathProviderFactory().factory()
        );
    }
}
