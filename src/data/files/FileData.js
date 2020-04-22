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
    }

    /**
     *
     * @return {FileTypeInterface}
     */
    getType() {
        return this._type;
    }
}
