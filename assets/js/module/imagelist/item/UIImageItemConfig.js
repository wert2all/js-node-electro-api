/**
 * @class UIImageItemConfig
 */
export default class UIImageItemConfig {
    /**
     *
     * @param {Document} document
     * @param {string} imageSelector
     * @param {string} downloadSelector
     * @param {string} imageTypeTitleSelector
     * @param {string} imageTitleContainerSelector
     */
    constructor(
        document,
        imageSelector,
        downloadSelector,
        imageTypeTitleSelector,
        imageTitleContainerSelector
    ) {
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
        /**
         *
         * @type {string}
         */
        this._imageTypeTitleSelector = imageTypeTitleSelector;
        /**
         *
         * @type {string}
         * @private
         */
        this._imageTypeTitleContainerSelector = imageTitleContainerSelector;
    }

    /**
     *
     * @return {string}
     */
    getImageTypeTitleContainerSelector() {
        return this._imageTypeTitleContainerSelector;
    }

    /**
     *
     * @return {string}
     */
    getImageTypeTitleSelector() {
        return this._imageTypeTitleSelector;
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
