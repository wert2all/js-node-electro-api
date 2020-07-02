/**
 * @class UiAuthNodesHolder
 */
export default class UiAuthNodesHolder {
    /**
     *
     * @param {DomListeners} domListeners
     * @param {Element|null} userName
     * @param {Node|null} avatarImg
     * @param {Node|null} profileLink
     * @param {Node|null} signOffLink
     */
    constructor(
        domListeners,
        userName = null,
        avatarImg = null,
        profileLink = null,
        signOffLink = null
    ) {
        /**
         *
         * @type {Node|null}
         * @private
         */
        this._userName = userName;
        /**
         *
         * @type {Node|null}
         * @private
         */
        this._avatarImg = avatarImg;
        /**
         *
         * @type {Node|null}
         * @private
         */
        this._profileLink = profileLink;
        /**
         *
         * @type {Node|null}
         * @private
         */
        this._signOutLink = signOffLink;
        /**
         *
         * @type {DomListeners}
         * @private
         */
        this._domListeners = domListeners;
    }

    /**
     *
     * @return {Node|null}
     */
    getAvatarImg() {
        return this._avatarImg;
    }

    /**
     *
     * @return {Element|null}
     */
    getUserName() {
        return this._userName;
    }

    /**
     *
     * @return {Node|null}
     */
    getSigOutWithoutListeners() {
        if (this._signOutLink !== null) {
            this._signOutLink = this._domListeners
                .removeEventListeners(this._signOutLink);
        }
        return this._signOutLink;
    }

    /**
     *
     * @return {Node|null}
     */
    getProfileLinkWithoutListeners() {
        if (this._profileLink !== null) {
            this._profileLink = this._domListeners
                .removeEventListeners(this._profileLink);
        }
        return this._profileLink;
    }
}
