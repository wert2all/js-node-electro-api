/**
 * @class UIImageItemConfigRadio
 */
export default class UIImageItemConfigRadio {
    /**
     *
     * @param {string} labelSelector
     * @param {string} inputSelector
     */
    constructor(
        labelSelector,
        inputSelector
    ) {
        /**
         *
         * @type {string}
         * @private
         */
        this._labelSelector = labelSelector;
        /**
         *
         * @type {string}
         * @private
         */
        this._inputSelector = inputSelector;
    }

    /**
     *
     * @return {string}
     */
    getInputSelector() {
        return this._inputSelector;
    }

    /**
     *
     * @return {string}
     */
    getLabelSelector() {
        return this._labelSelector;
    }
}
