/**
 * @class GApiConfig
 */
export default class GApiConfig {
    /**
     *
     * @param {GApiAuthConfig} gaAuthConfig
     * @param {string} url
     */
    constructor(gaAuthConfig, url) {
        /**
         * @type GApiAuthConfig
         * @private
         */
        this._gaAuth = gaAuthConfig;
        this._apiUrl = url;
    }

    /**
     *
     * @return {GApiAuthConfig}
     */
    getAuthConfig() {
        return this._gaAuth;
    }

    /**
     *
     * @return {string}
     */
    getApiUrl() {
        return this._apiUrl;
    }
}
