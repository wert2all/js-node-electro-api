/**
 * @class GulpTask
 */
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
                    await imageManager.startProcess();
                    const processor = this._processorFactory.create(imageManager.getData());
                    let result = null;
                    if (processor) {
                        result = processor.processImage(imageManager.getData());
                    }
                    imageManager.setResult(result);
                    await imageManager.stopProcess();
                }
            }
        }
        return Promise.resolve();
    }
}
