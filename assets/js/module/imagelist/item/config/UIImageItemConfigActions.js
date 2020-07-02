/**
 * @class UIImageItemConfigActions
 */
export default class UIImageItemConfigActions {
    /**
     * @param {string} downloadSelector
     * @param {string} editSelector
     * @param {string} deleteSelector
     */
    constructor(downloadSelector, editSelector, deleteSelector) {
        /**
         *
         * @type {string}
         * @private
         */
        this._downloadSelector = downloadSelector;
        /**
         *
         * @type {string}
         * @private
         */
        this._editSelector = editSelector;
        /**
         *
         * @type {string}
         * @private
         */
        this._deleteSelector = deleteSelector;
    }

    /**
     *
     * @return {string}
     */
    getDownloadSelector() {
        return this._downloadSelector;
    }

    /**
     *
     * @return {string}
     */
    getDeleteSelector() {
        return this._deleteSelector;
    }

    /**
     *
     * @return {string}
     */
    getEditSelector() {
        return this._editSelector;
    }


}
