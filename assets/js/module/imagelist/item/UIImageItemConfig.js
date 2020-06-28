/**
 * @class UIImageItemConfig
 */
export default class UIImageItemConfig {
    /**
     *
     * @param {Document} document
     */
    constructor(document) {
        /**
         *
         * @type {Document}
         * @private
         */
        this._document = document;
    }

    /**
     *
     * @return {Document}
     */
    getDocument() {
        return this._document;
    }
}
