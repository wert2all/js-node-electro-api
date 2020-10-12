/**
 * @class GulpTask
 */
export default class GulpTask {
    /**
     *
     * @param {IImageRepository} repository
     */
    constructor(repository) {
        /**
         *
         * @type {IImageRepository}
         * @private
         */
        this._repository = repository;
    }

    async go() {
        const entities = await this._repository.getImages();
        for (let key in entities) {
            if (entities.hasOwnProperty(key)) {
                const imageManager = entities[key];
                if (imageManager.canProcess()) {
                    await imageManager.startProcess();
                    // const mlProcessor = this._getImageMlProcessor(imageManager.getData());
                    let result = null;
                    // if (mlProcessor) {
                    //     result = mlProcessor.processImage(imageManager.getData());
                    // }
                    imageManager.setResult(result);
                    await imageManager.stopProcess();
                }
            }
        }
        return Promise.resolve();
    }
}
