import UIAuthElementInterface from '../interfaces/UIAuthElementInterface';

/**
 * @class UIAuthElement
 * @extends UIAuthElementInterface
 * @type UIElementInterface
 */
export default class UIAuthElement extends UIAuthElementInterface {
    /**
     *
     * @param {UiAuthNodesHolder} nodeHolder
     * @param {UiAuthElementDefaultValues} defaultValues
     */
    constructor(nodeHolder, defaultValues) {
        super();
        /**
         *
         * @type {UiAuthElementDefaultValues}
         * @private
         */
        this._defaultValues = defaultValues;
        /**
         *
         * @type {UiAuthNodesHolder}
         * @private
         */
        this._nodeHolder = nodeHolder;
        /**
         *
         * @type {AuthProviderInterface|null
         * @private
         */
        this._authProvider = null;
    }

    /**
     *
     * @param {AuthProviderInterface} authProvider
     */
    setAuthProvider(authProvider) {
        this._authProvider = authProvider;
        return this;
    }

    /**
     * @return {void}
     */
    clean() {
        this.init();
    }

    init() {
        let signOut = this._nodeHolder.getSigOutWithoutListeners();
        const avatar = this._nodeHolder.getAvatarImg();
        const userName = this._nodeHolder.getUserName();
        let profileLink = this._nodeHolder.getProfileLinkWithoutListeners();

        if (signOut != null) {
            if (this._authProvider != null) {
                signOut.addEventListener('click', () => this._authProvider.signOut());
            }
        }
        if (profileLink != null) {
            profileLink.addEventListener('click', (event) => event.preventDefault());
        }
        if (avatar != null) {
            avatar.src = this._defaultValues.getAvatar();
        }
        if (userName != null) {
            userName.innerHTML = this._defaultValues.getUserName();
        }
        if (this._authProvider != null) {
            this._setUser(this._authProvider.getUserProfile());
        }
    }

    /**
     *
     * @param {DataGoogleAuthUser} user
     * @return {UIAuthElementInterface}
     * @private
     */
    _setUser(user) {
        const avatar = this._nodeHolder.getAvatarImg();
        const userName = this._nodeHolder.getUserName();
        if (avatar != null) {
            avatar.src = user.getUserImage();
        }
        if (userName != null) {
            userName.innerHTML = user.getUserName();
        }
        return this;
    }

    /**
     *
     * @param {function} listener
     */
    applyProfileClick(listener) {
        const profileLink = this._nodeHolder.getProfileLinkWithoutListeners();
        if (profileLink != null) {
            profileLink.addEventListener(
                'click',
                () => {
                    if (this._authProvider != null) {
                        listener(this._authProvider.getUserProfile());
                    }
                }
            );
        }
    }
}
