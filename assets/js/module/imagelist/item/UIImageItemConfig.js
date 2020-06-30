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
     * @param {string} yearMonSelector
     * @param {UIImageItemConfigRadio} radioSelector
     * @param {UIImageItemConfigProfile} profileSelector
     * @param {UIImageItemConfigActions} actionsSelector
     */
    constructor(
        imageSelector,
        downloadSelector,
        imageTypeTitleSelector,
        imageTitleContainerSelector,
        yearMonSelector,
        radioSelector,
        profileSelector,
        actionsSelector
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
        /**
         *
         * @type {string}
         * @private
         */
        this._yearmonSelector = yearMonSelector;
        /**
         *
         * @type {UIImageItemConfigRadio}
         * @private
         */
        this._radioSelector = radioSelector;
        /**
         *
         * @type {UIImageItemConfigProfile}
         * @private
         */
        this._profileSelector = profileSelector;
        /**
         *
         * @type {UIImageItemConfigActions}
         * @private
         */
        this._actionSelector = actionsSelector;
    }

    /**
     *
     * @return {UIImageItemConfigActions}
     */
    getActionSelector() {
        return this._actionSelector;
    }

    /**
     *
     * @return {UIImageItemConfigProfile}
     */
    getProfileSelector() {
        return this._profileSelector;
    }

    /**
     *
     * @return {UIImageItemConfigRadio}
     */
    getRadioSelector() {
        return this._radioSelector;
    }

    /**
     *
     * @return {string}
     */
    getYearmonSelector() {
        return this._yearmonSelector;
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
