/**
 * @class UIProfileView
 */
export default class UIProfileView {
    /**
     *
     * @param {ParentNode} parentNode
     * @param {UIProfileSelectorsHolder} profileSelectorsHolder
     */
    constructor(parentNode, profileSelectorsHolder) {
        /**
         *
         * @type {ParentNode}
         * @private
         */
        this._parentNode = parentNode;
        /**
         *
         * @type {UIProfileSelectorsHolder}
         * @private
         */
        this._selectorsHolder = profileSelectorsHolder;
        /**
         *
         * @type {null|Element}
         * @private
         */
        this._nameNode = null;
        /**
         *
         * @type {null|Element}
         * @private
         */
        this._avatarNode = null;
    }

    init() {
        this._nameNode = this._parentNode.querySelector(this._selectorsHolder.getNameSelector());
        this._avatarNode = this._parentNode.querySelector(this._selectorsHolder.getAvatarSelector());
    }

    /**
     *
     * @param {DataGoogleAuthUser} userData
     * @return {UIImageItem}
     */
    setUserData(userData) {
        if (this._nameNode !== null) {
            this._nameNode.innerHTML = userData.getUserName();
        }
        if (this._avatarNode != null && userData.getUserImage() !== "") {
            this._avatarNode.src = userData.getUserImage();
        }
    }
}
