import UIElementInterface from '../../ui/interfaces/element/UIElementInterface';

/**
 * @class UILoader
 * @type UIElementInterface
 * @extends UIElementInterface
 */
export default class UILoader extends UIElementInterface {
    /**
     *
     * @param {Node} element
     */
    constructor(element) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._loader = element;
    }

    /**
     * @abstract
     * @return {UIElementInterface}
     */
    clone() {
        return new UILoader(this._loader.cloneNode(true));
    }

    /**
     * @return {void}
     */
    init() {
    }

    /**
     * @abstract
     * @return {Node}
     */
    getNode() {
        return this._loader;
    }

    /**
     * @abstract
     * @return {void}
     */
    clean() {
    }
}
