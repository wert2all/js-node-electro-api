/**
 * @class FileData
 */
export default class FileData {
    /**
     *
     * @param {string} name
     * @param {FileTypeInterface} type
     * @param {FileSize} fileSize
     */
    constructor(name, type, fileSize) {
        /**
         *
         * @type {string}
         * @private
         */
        this._name = name;
        /**
         *
         * @type {FileSize}
         * @private
         */
        this._fileSize = fileSize;
        /**
         *
         * @type {FileTypeInterface}
         * @private
         */
        this._type = type;
        /**
         *
         * @type {string|boolean}
         * @private
         */
        this._filepath = false;
    }

    /**
     *
     * @return {FileTypeInterface}
     */
    getType() {
        return this._type;
    }

    /**
     *
     * @param {string} path
     * @return {FileData}
     */
    setPath(path) {
        this._filepath = path;
        return this;
    }

    /**
     *
     * @return {string}
     */
    getName() {
        return this._name;
    }

    /**
     *
     * @return {string|boolean}
     */
    getPath() {
        return this._filepath;
    }

    /**
     *
     * @param link
     * @return {FileData}
     */
    setFileFsLink(link) {
        /**
         * @type {*}
         * @private
         */
        this._fsLink = link;
        return this;
    }

    /**
     *
     * @return {*}
     */
    getFsLink() {
        return this._fsLink;
    }
}
