/**
 * @class UiAuthElementDefaultValues
 */
export default class UiAuthElementDefaultValues {
    /**
     *
     * @param {string} defaultAvatar
     * @param {string} defaultUserName
     */
    constructor(defaultAvatar, defaultUserName) {
        /**
         *
         * @type {string}
         * @private
         */
        this._defaultAvatar = defaultAvatar;
        /**
         *
         * @type {string}
         * @private
         */
        this._defaultUserName = defaultUserName;
    }

    /**
     *
     * @return {string}
     */
    getUserName() {
        return this._defaultUserName;
    }

    /**
     *
     * @return {string}
     */
    getAvatar() {
        return this._defaultAvatar;
    }
}
