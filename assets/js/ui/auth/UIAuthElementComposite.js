import UIAuthElementInterface from '../interfaces/UIAuthElementInterface';

/**
 * @class UIAuthElementComposite
 * @extends UIAuthElementInterface
 * @type UIElementInterface
 */
export default class UIAuthElementComposite extends UIAuthElementInterface {
    /**
     *
     * @param {UIAuthElementInterface[]} elements
     */
    constructor(elements) {
        super();
        /**
         *
         * @type {UIAuthElementInterface[]}
         * @private
         */
        this._elements = elements;
    }

    /**
     * @return {void}
     */
    clean() {
        this._elements.forEach(element => element.clean());
    }

    /**
     * @return {void}
     */
    init() {
        this._elements.forEach(element => element.init());
    }

    /**
     *
     * @param {UserProfile} user
     * @return UIAuthElementInterface
     */
    setUser(user) {
        this._elements.forEach(element => element.setUser(user));
        return this;
    }

    /**
     *
     * @param {AuthProviderInterface} authProvider
     * @return UIAuthElementInterface
     */
    setAuthProvider(authProvider) {
        this._elements.forEach(element => element.setAuthProvider(authProvider));
        return this;
    }
}
