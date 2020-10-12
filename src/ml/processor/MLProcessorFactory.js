import MLFakeProcessor from "./MLFakeProcessor";

/**
 * @class MLProcessorFactory
 */
export default class MLProcessorFactory {
    /**
     *
     * @param {UserFilesEntity} entity
     * @return {IMlProcessor|null}
     */
    create(entity) {
        return new MLFakeProcessor();
    }
}
