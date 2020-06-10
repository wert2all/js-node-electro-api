export default class ServerConfig {
    /**
     *
     * @param {string} webServerDirectoryPath
     * @param {string} applicationDirectoryPath
     */
    constructor(webServerDirectoryPath, applicationDirectoryPath) {
        /**
         *
         * @type {string}
         * @private
         */
        this._webserverDirectory = webServerDirectoryPath;
        /**
         *
         * @type {string}
         * @private
         */
        this._applicationDirectoryPath = applicationDirectoryPath;
    }

    /**
     *
     * @return {string}
     */
    getApplicationDirectory() {
        return this._applicationDirectoryPath;
    }

    /**
     *
     * @return {string}
     */
    getWebserverDirectory() {
        return this._webserverDirectory;
    }
}
