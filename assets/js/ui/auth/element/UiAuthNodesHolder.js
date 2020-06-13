/**
 * @class UiAuthNodesHolder
 */
export default class UiAuthNodesHolder {
    /**
     *
     * @param {Element|null} userName
     * @param {Node|null} avatarImg
     * @param {Node|null} profileLink
     * @param {Node|null} signOffLink
     */
    constructor(userName = null,
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
            this._signOutLink = this._removeEventListeners(this._signOutLink);
        }
        return this._signOutLink;
    }

    /**
     *
     * @return {Node|null}
     */
    getProfileLinkWithoutListeners() {
        if (this._profileLink !== null) {
            this._profileLink = this._removeEventListeners(this._profileLink);
        }
        return this._profileLink;
    }

    /**
     *
     * @param {Node} element
     * @return {Node}
     * @private
     */
    _removeEventListeners(element) {
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        return newElement;
    }
}
