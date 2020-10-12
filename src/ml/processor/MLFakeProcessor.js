import IMlProcessor from "./IMlProcessor";
import ImageResult from "../gulp/image/ImageResult";

/**
 * @class MLFakeProcessor
 * @extends IMlProcessor
 * @type IMlProcessor
 */
export default class MLFakeProcessor extends IMlProcessor {
    /**
     *
     * @param {UserFilesEntity} entity
     * @param {ImageResult} result
     */
    async processImage(entity, result) {
        return Promise.resolve();
    }
}
