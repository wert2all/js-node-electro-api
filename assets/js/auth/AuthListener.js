import OnSignInChangedInterface from '../google/auth/listeners/OnSignInChangedInterface';

/**
 * @class AuthListener
 * @type OnSignInChangedInterface
 * @extends OnSignInChangedInterface
 */
export default class AuthListener extends OnSignInChangedInterface {
    /**
     *
     * @param {UIInterface} ui
     */
    constructor(ui) {
        super();
        /**
         *
         * @type {UIInterface}
         * @private
         */
        this._ui = ui;
    }

    /**
     * @param {AuthProviderInterface} authProvider
     */
    // eslint-disable-next-line no-unused-vars
    onAuth(authProvider) {
        this._ui
            .getAuthElement()
            .setUser(authProvider.getUserProfile());
    }

    /**
     * @param {AuthProviderInterface} authProvider
     */
    // eslint-disable-next-line no-unused-vars
    onNonAuth(authProvider) {
        console.log('no auth');
        this._ui.clean();
        authProvider.signIn();
    }
}
