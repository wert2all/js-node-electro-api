import Cropper from "cropperjs";

/**
 * @class CropperFactory
 */
export default class CropperFactory {
    /**
     *
     * @param {Cropper.Options} options
     * @param {ICropperActionInterface} cropperAction
     */
    constructor(options, cropperAction) {
        /**
         *
         * @type {ICropperActionInterface}
         * @private
         */
        this._cropperAction = cropperAction;
        /**
         *
         * @type {Cropper.Options}
         * @private
         */
        this._options = options;
    }

    /**
     *
     * @param {HTMLImageElement|HTMLCanvasElement} image
     * @return {Promise<Cropper>}
     */
    create(image) {
        return new Promise((resolve) => {
            const self = this;
            this._options.ready = function () {
                self._cropperAction.setCropper(this.cropper);
                resolve(this.cropper);
            };
            new Cropper(image, this._options);
        });
    }
}
