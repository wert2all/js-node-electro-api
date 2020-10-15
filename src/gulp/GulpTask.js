/**
 * @class GulpTask
 */
export default class GulpTask {
    /**
     *
     * @param {ImageRepositoryInterface} repository
     * @param {ProcessorFactoryInterface} processorFactory
     * @param {ImageResultFactoryInterface} resultFactory
     */
    constructor(repository, processorFactory, resultFactory) {
        /**
         *
         * @type {ImageResultFactoryInterface}
         * @private
         */
        this._resultFactory = resultFactory;
        /**
         *
         * @type {ImageRepositoryInterface}
         * @private
         */
        this._repository = repository;
        /**
         *
         * @type {ProcessorFactoryInterface}
         * @private
         */
        this._processorFactory = processorFactory;
    }

    async go() {
        const entities = await this._repository.getImages();
        for (let key in entities) {
            if (entities.hasOwnProperty(key)) {
                /**
                 * @type {ImageManagerInterface} imageManager
                 */
                const imageManager = entities[key];
                if (imageManager.canProcess()) {
                    /**
                     *
                     * @type {ImageResultInterface}
                     */
                    const result = this._resultFactory.create();
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
