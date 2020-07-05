/**
 * @class UIImageItemConfig
 */
export default class UIImageItemConfig {
    /**
     *
     * @param {string} imageSelector
     * @param {string} imageTypeTitleSelector
     * @param {string} imageTitleContainerSelector
     * @param {string} yearMonSelector
     * @param {UIImageItemConfigRadio} radioSelector
     * @param {UIImageItemConfigProfile} profileSelector
     */
    constructor(
        imageSelector,
        imageTypeTitleSelector,
        imageTitleContainerSelector,
        yearMonSelector,
        radioSelector,
        profileSelector
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
    getImage() {
        return this._image;
    }
}
