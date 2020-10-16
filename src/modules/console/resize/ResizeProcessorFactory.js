import ProcessorFactoryInterface from "../../../lib/console/gulp/processor/ProcessorFactoryInterface";
import ResizeProcessor from "./ResizeProcessor";
import ResizeConfig from "./size/ResizeConfig";
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
            new ResizeSizesHolder([
                new ResizeConfig("250x330", 250, 330, "contain", {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 1,
                }),
            ]),
            new RotateDestinationPathProviderFactory().factory(),
            new ResizeDestinationPathProviderFactory().factory()
        );
    }
}
