/**
 * @class UIImageItemConfigActions
 */
export default class UIImageItemConfigActions {
    /**
     *
     * @param {string} editSelector
     * @param {string} deleteSelector
     */
    constructor(editSelector, deleteSelector) {
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
