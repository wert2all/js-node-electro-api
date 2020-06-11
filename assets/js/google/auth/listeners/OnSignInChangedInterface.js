/**
 * @class OnSignInChangedInterface
 * @interface
 */
export default class OnSignInChangedInterface {
    /**
     * @param {AuthProviderInterface} authProvider
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    onAuth(authProvider) {

    }

    /**
     * @param {AuthProviderInterface} authProvider
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    onNonAuth(authProvider) {
    }
}
