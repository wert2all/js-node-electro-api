/**
 * @class AuthProviderInterface
 * @interface
 */
export default class AuthProviderInterface {
    /**
     * @return {void}
     * @abstract
     */
    signIn() {
    }

    /**
     * @return {void}
     * @abstract
     */
    signOut() {
    }

    /**
     * @return {UserProfile}
     * @abstract
     */
    getUserProfile() {

    }
}
