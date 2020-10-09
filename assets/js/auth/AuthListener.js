import OnSignInChangedInterface from "../google/auth/listeners/OnSignInChangedInterface";

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
        /**
         *
         * @private
         */
        this._afterAuth = Function.prototype;
    }

    /**
     * @param {AuthProviderInterface} authProvider
     */
    // eslint-disable-next-line no-unused-vars
    onAuth(authProvider) {
        this._afterAuth(authProvider);
    }

    /**
     * @param {AuthProviderInterface} authProvider
     */
    // eslint-disable-next-line no-unused-vars
    onNonAuth(authProvider) {
        console.log("no auth");
        this._ui.clean();
        authProvider.signIn();
    }

    /**
     *
     * @param afterAuthFunction
     * @return {AuthListener}
     */
    addAfterAuth(afterAuthFunction) {
        this._afterAuth = afterAuthFunction;
        return this;
    }
}
