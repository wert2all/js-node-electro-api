import UIContentElementInterface from './UIContentElementInterface';

/**
 * @class UIContentElement
 * @extends UIContentElementInterface
 * @type UIContentElementInterface
 */
export default class UIContentElement extends UIContentElementInterface {

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
        this._parentElement = element;
        /**
         *
         * @type {UIElementInterface[]}
         * @private
         */
        this._elements = [];
    }

    /**
     *
     * @param element
     * @return {UIElementInterface}
     */
    addElement(element) {
        this._elements.push(element);
        this._parentElement.appendChild(element.getNode());
        return this;
    }

    clean() {
        this._elements.forEach(element => element.clean());
    }

    /**
     *
     * @return {Node}
     */
    getNode() {
        return this._parentElement;
    }

    init() {
    }
}
