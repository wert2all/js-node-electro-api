/**
 * @class UIImageItemConfigProfile
 */
export default class UIImageItemConfigProfile {
    /**
     *
     * @param {string} avatarSelector
     * @param {string} nameSelector
     * @param {string} profileIconSelector
     */
    constructor(avatarSelector, nameSelector, profileIconSelector) {
        /**
         *
         * @type {string}
         * @private
         */
        this._avatarSelector = avatarSelector;
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
        this._profileIconSelector = profileIconSelector;
    }

    /**
     *
     * @return {string}
     */
    getProfileIconSelector() {
        return this._profileIconSelector;
    }

    /**
     *
     * @return {string}
     */
    getNameSelector() {
        return this._nameSelector;
    }

    /**
     *
     * @return {string}
     */
    getAvatarSelector() {
        return this._avatarSelector;
    }


}
