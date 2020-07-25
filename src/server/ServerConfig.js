export default class ServerConfig {
    /**
     *
     * @param {string} webServerDirectoryPath
     * @param {string} applicationDirectoryPath
     * @param {string} logSubDirectory
     */
    constructor(webServerDirectoryPath, applicationDirectoryPath, logSubDirectory) {
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
        /**
         *
         * @type {string}
         * @private
         */
        this._logDirectory = this.getApplicationDirectory() + logSubDirectory;
    }

    /**
     *
     * @return {string}
     */
    getLogDirectory() {
        return this._logDirectory;
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
