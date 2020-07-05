/**
 * @class UIProfileSelectorsHolder
 */
export default class UIProfileSelectorsHolder {
    /**
     *
     * @param {string} nameSelector
     * @param {string} avatarSelector
     */
    constructor(nameSelector, avatarSelector) {
        /**
         *
         * @type {string}
         * @private
         */
        this._nameSelector = nameSelector;
        /**
         *
         * @type {string}
         * @private
         */
        this._avatarSelector = avatarSelector;
    }

    /**
     *
     * @return {string}
     */
    getAvatarSelector() {
        return this._avatarSelector;
    }

    /**
     *
     * @return {string}
     */
    getNameSelector() {
        return this._nameSelector;
    }
}
