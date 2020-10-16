import ProcessorInterface from "../../../lib/console/gulp/processor/ProcessorInterface";

/**
 * @class ResizeProcessor
 * @extends ProcessorInterface
 * @type ProcessorInterface
 */
export default class ResizeProcessor extends ProcessorInterface {
    /**
     *
     * @param {ResizeSizesHolder} sizes
     */
    constructor(sizes) {
        super();
        /**
         *
         * @type {ResizeSizesHolder}
         * @private
         */
        this._sizes = sizes;
    }

    /**
     * @param {UserFilesEntity} entity
     * @param {ImageResultInterface} result
     * @return {Promise<ImageResultInterface>} result
     */
    async processImage(entity, result) {
        const sizePromises = this._sizes.getSizes().map((size) => {
            return new Promise((resolve) => {
                resolve(true);
            });
        });
        return Promise.resolve(result);
    }
}
