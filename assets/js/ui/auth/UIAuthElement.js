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
    }

    /**
     *
     * @param {UserProfile} user
     * @return {UIAuthElementInterface}
     */
    setUser(user) {
        const avatar = this._nodeHolder.getAvatarImg();
        const userName = this._nodeHolder.getUserName();
        const profileLink = this._nodeHolder.getProfileLinkWithoutListeners();
        if (avatar != null) {
            avatar.src = user.getUserImage();
        }
        if (userName != null) {
            userName.innerHTML = user.getUserName();
        }
        if (profileLink != null) {
            profileLink.addEventListener(
                'click',
                () => this._defaultValues.showProfile(user)
            );
        }
        return this;
    }
}
