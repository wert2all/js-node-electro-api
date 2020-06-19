import AuthProviderInterface from '../../auth/AuthPrividerInterface';
import UserProfile from '../../data/UserProfile';

/**
 * @class GApiAuth
 * @extends AuthProviderInterface
 * @type AuthProviderInterface
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
    signOut() {
        this._gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * @return {UserProfile}
     */
    getUserProfile() {
        const currentUser = this._gapi.auth2.getAuthInstance().currentUser.get();
        const profile = currentUser.getBasicProfile();
        const authResponse = currentUser.getAuthResponse(true);
        return new UserProfile(
            profile.getId(),
            profile.getName(),
            profile.getEmail(),
            profile.getImageUrl(),
            authResponse.id_token
        );
    }
}
