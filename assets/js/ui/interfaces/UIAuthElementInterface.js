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
     * @param {AuthProviderInterface} authProvider
     * @return UIAuthElementInterface
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    setAuthProvider(authProvider) {

    }

    /**
     * @abstract
     * @param {function} listener
     */
    // eslint-disable-next-line no-unused-vars
    applyProfileClick(listener) {

    }
}
