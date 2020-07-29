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
     * @param {AuthProviderInterface} authProvider
     * @return UIAuthElementInterface
     */
    setAuthProvider(authProvider) {
        this._elements.forEach(element => element.setAuthProvider(authProvider));
        return this;
    }

    /**
     *
     * @param {function} listener
     */
    applyProfileClick(listener) {
        this._elements.forEach(element => element.applyProfileClick(listener));
    }
}
