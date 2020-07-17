import UIElementInterface from '../interfaces/element/UIElementInterface';

/**
 * @class UISimpleElement
 * @type UIElementInterface
 * @extends UIElementInterface
 */
export default class UISimpleElement extends UIElementInterface {

    /**
     *
     * @param {Node} node
     */
    constructor(node) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._node = node;
    }

    /**
     * @return void
     */
    clean() {
        this._node.parentNode.removeChild(this._node);
    }

    /**
     *
     * @return {UIElementInterface}
     */
    clone() {
        return new UISimpleElement(this._node.cloneNode(true));
    }

    /**
     *
     * @return {ParentNode}
     */
    getNode() {
        return this._node;
    }

    /**
     * @return void
     */
    init() {
    }
}
