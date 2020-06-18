import UIElementInterface from './element/UIElementInterface';

/**
 * @class UIAuthElementInterface
 * @extends UIElementInterface
 * @type UIElementInterface
 * @interface
 * @abstract
 */
export default class UIAuthElementInterface extends UIElementInterface {
    /**
     *
     * @param {UserProfile} user
     * @return UIAuthElementInterface
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    setUser(user) {

    }

    /**
     *
     * @param {AuthProviderInterface} authProvider
     * @return UIAuthElementInterface
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    setAuthProvider(authProvider) {

    }
}
