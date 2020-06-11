/**
 * @class UIConfig
 */
export default class UIConfig {
    /**
     *
     * @param {GApiConfig} googleConfig
     */
    constructor(googleConfig) {
        /**
         *
         * @type {GApiConfig}
         * @private
         */
        this._googleConfig = googleConfig;
    }

    /**
     *
     * @return {GApiConfig}
     */
    getGoogleConfig() {
        return this._googleConfig;
    }
}
