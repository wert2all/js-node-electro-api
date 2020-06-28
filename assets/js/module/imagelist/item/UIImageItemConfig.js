/**
 * @class UIImageItemConfig
 */
export default class UIImageItemConfig {
    /**
     *
     * @param {string} imageSelector
     * @param {string} downloadSelector
     * @param {string} imageTypeTitleSelector
     * @param {string} imageTitleContainerSelector
     */
    constructor(
        imageSelector,
        downloadSelector,
        imageTypeTitleSelector,
        imageTitleContainerSelector
    ) {
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
