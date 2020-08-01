/**
 * @class UIImageItemConfigActions
 */
export default class UIImageItemConfigActions {
    /**
     * @param {string} downloadSelector
     * @param {string} editSelector
     * @param {string} deleteSelector
     * @param {string} mainCardSelector
     */
    constructor(downloadSelector, editSelector, deleteSelector, mainCardSelector) {
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
        /**
         *
         * @type {string}
         * @private
         */
        this._mainCardSelector = mainCardSelector;
    }

    /**
     *
     * @return {string}
     */
    getMainCardSelector() {
        return this._mainCardSelector;
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
