import ProcessorFactoryInterface from "../../../lib/console/gulp/processor/ProcessorFactoryInterface";
import ResizeProcessor from "./ResizeProcessor";
import SizeConfig from "./size/SizeConfig";
import ResizeSizesHolder from "./size/ResizeSizesHolder";
import ResizeDestinationPathProviderFactory from "./path/ResizeDestinationPathProviderFactory";
import RotateDestinationPathProviderFactory from "./path/RotateDestinationPathProviderFactory";

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
            new ResizeSizesHolder([new SizeConfig("250x330", 250, 330)]),
            new RotateDestinationPathProviderFactory().factory(),
            new ResizeDestinationPathProviderFactory().factory()
        );
    }
}
