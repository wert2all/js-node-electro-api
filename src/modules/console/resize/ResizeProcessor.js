import ProcessorInterface from "../../../lib/console/gulp/processor/ProcessorInterface";

/**
 * @class ResizeProcessor
 * @extends ProcessorInterface
 * @type ProcessorInterface
 */
export default class ResizeProcessor extends ProcessorInterface {
    /**
     * @param {UserFilesEntity} entity
     * @param {ImageResultInterface} result
     * @return {Promise<ImageResultInterface>} result
     */
    async processImage(entity, result) {
        return Promise.resolve(result);
    }
}
