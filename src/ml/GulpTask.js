/**
 * @class GulpTask
 */
import ImageResult from "./gulp/image/ImageResult";

export default class GulpTask {
    /**
     *
     * @param {IImageRepository} repository
     * @param {MLProcessorFactory} mlProcessorFactory
     */
    constructor(repository, mlProcessorFactory) {
        /**
         *
         * @type {IImageRepository}
         * @private
         */
        this._repository = repository;
        this._processorFactory = mlProcessorFactory;
    }

    async go() {
        const entities = await this._repository.getImages();
        for (let key in entities) {
            if (entities.hasOwnProperty(key)) {
                /**
                 * @type {IImageManager} imageManager
                 */
                const imageManager = entities[key];
                if (imageManager.canProcess()) {
                    const result = new ImageResult();
                    try {
                        await imageManager.startProcess();
                        const processor = this._processorFactory.create(imageManager.getData());
                        if (processor) {
                            await processor.processImage(imageManager.getData(), result);
                        }
                    } catch (e) {
                        console.log(e);
                        result.setError(e);
                    } finally {
                        imageManager.setResult(result);
                        await imageManager.stopProcess();
                    }
                }
            }
        }
        return Promise.resolve();
    }
}
