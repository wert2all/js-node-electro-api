import AuthProviderInterface from '../../auth/AuthPrividerInterface';

/**
 * @class GApiAuth
 */
export default class GApiAuth extends AuthProviderInterface {
    /**
     *
     * @param {GApiAuthConfig} config
     * @param gapi
     * @param {OnSignInChangedInterface} onSignInChanged
     */
    constructor(config, gapi, onSignInChanged) {
        super();
        /**
         *
         * @type {GApiAuthConfig}
         * @private
         */
        this._config = config;
        /**
         *
         * @private
         */
        this._gapi = gapi;
        /**
         *
         * @type {OnSignInChangedInterface}
         * @private
         */
        this._onSignInStatusChanged = onSignInChanged;
    }

    init() {
        console.log('GAPI init');
        gapi.client.init({
            'clientId': this._config.getClientId(),
            'scope': this._config.getScope()
        })
            .then(() => {
                const GoogleAuth = this._gapi.auth2.getAuthInstance();
                GoogleAuth.isSignedIn.listen(this._getAuthCheckFunction(GoogleAuth));
                this._getAuthCheckFunction(GoogleAuth)();
            })
            .catch(e => {
                console.log('cant init client');
                console.log(e);
            });
    }

    /**
     *
     * @param GoogleAuth
     * @return {function(...[*]=)}
     * @private
     */
    _getAuthCheckFunction(GoogleAuth) {
        return () => {
            const user = GoogleAuth.currentUser.get();
            const isAuthorized = user.hasGrantedScopes(this._config.getScope());
            if (isAuthorized) {
                this._onSignInStatusChanged.onAuth(this);
            } else {
                this._onSignInStatusChanged.onNonAuth(this);
            }
        };
    }

    /**
     * @return {void}
     */
    signIn() {
        this._gapi.auth2.getAuthInstance().signIn();
    }

    /**
     * @return {void}
     */
    signOff() {
        this._gapi.auth2.getAuthInstance().signOut();
    }

}
