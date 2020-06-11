import OnSignInChangedInterface from '../google/auth/listeners/OnSignInChangedInterface';

/**
 * @class AuthListener
 * @type OnSignInChangedInterface
 * @extends OnSignInChangedInterface
 */
export default class AuthListener extends OnSignInChangedInterface {
    /**
     * @param {AuthProviderInterface} authProvider
     */
    // eslint-disable-next-line no-unused-vars
    onAuth(authProvider) {
        console.log('auth');
        console.log(authProvider.getUserProfile());
    }

    /**
     * @param {AuthProviderInterface} authProvider
     */
    // eslint-disable-next-line no-unused-vars
    onNonAuth(authProvider) {
        console.log('no auth');
        authProvider.signIn();
    }
}
