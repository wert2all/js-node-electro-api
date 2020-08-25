/**
 * @class UIConfig
 */
export default class UIConfig {
    /**
     *
     * @param {GApiConfig} googleConfig
     * @param {Cropper.Options} cropperConfig
     */
    constructor(googleConfig, cropperConfig) {
        /**
         *
         * @type {GApiConfig}
         * @private
         */
        this._googleConfig = googleConfig;
        /**
         *
         * @type {Cropper.Options}
         * @private
         */
        this._cropperConfig = cropperConfig;
    }

    /**
     *
     * @return {GApiConfig}
     */
    getGoogleConfig() {
        return this._googleConfig;
    }

    /**
     *
     * @return {Cropper.Options}
     */
    getCropperOptions() {
        return this._cropperConfig;
    }
}
