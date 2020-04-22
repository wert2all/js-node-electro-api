/**
 * @class FileData
 */
export default class FileData {

    /**
     *
     * @param {FileTypeInterface} type
     */
    constructor(type) {
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
