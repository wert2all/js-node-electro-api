/**
 * @class UIImageItemConfig
 */
export default class UIImageItemConfig {
    /**
     *
     * @param {Document} document
     * @param {string} imageSelector
     * @param {string} downloadSelector
     */
    constructor(document, imageSelector, downloadSelector) {
        /**
         *
         * @type {Document}
         * @private
         */
        this._document = document;
        /**
         *
         * @type {string}
         * @private
         */
        this._image = imageSelector;
        /**
         *
         * @type {string}
         * @private
         */
        this._iconDownload = downloadSelector;
    }

    /**
     *
     * @return {string}
     */
    getIconDownload() {
        return this._iconDownload;
    }

    /**
     *
     * @return {string}
     */
    getImage() {
        return this._image;
    }

    /**
     *
     * @return {Document}
     */
    getDocument() {
        return this._document;
    }
}
