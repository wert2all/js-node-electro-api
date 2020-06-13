/**
 * @class UiAuthElementDefaultValues
 */
export default class UiAuthElementDefaultValues {
    /**
     *
     * @param {string} defaultAvatar
     * @param {string} defaultUserName
     * @param {function} showProfileFunc
     */
    constructor(defaultAvatar, defaultUserName, showProfileFunc = Function.prototype) {
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
        /**
         *
         * @type {Function}
         * @private
         */
        this._showProfile = showProfileFunc;
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

    /**
     * @param {UserProfile} user
     * @return {void}
     */
    showProfile(user) {
        this._showProfile(user);
    }
}
