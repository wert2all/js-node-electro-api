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

    /**
     *
     * @param {Function} cb
     */
    go(cb) {
        this._repository.getImages().forEach((imageManager) => {
            if (imageManager.canProcess()) {
                imageManager.startProcess();
                const mlProcessor = this._getImageMlProcessor(imageManager.getData());
                let result = null;
                if (mlProcessor) {
                    result = mlProcessor.processImage(imageManager.getData());
                }
                imageManager.setResult(result);
                imageManager.stopProcess();
            }
        });
        this._done(cb);
    }

    /**
     *
     * @param {Function} cb
     * @private
     */
    _done(cb) {
        cb();
    }
}
