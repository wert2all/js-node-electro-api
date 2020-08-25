import Cropper from 'cropperjs';

/**
 * @class CropperFactory
 */
export default class CropperFactory {
    /**
     *
     * @param {Cropper.Options} options
     */
    constructor(options) {
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
        return new Promise(resolve => {
            this._options.ready = function () {
                resolve(this.cropper);
            };
            new Cropper(image, this._options);
        });

    }
}
