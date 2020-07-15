import UIElementInterface from '../../interfaces/element/UIElementInterface';

/**
 * @class UIPageItem
 * @type UIElementInterface
 * @extends UIElementInterface
 */
export default class UIPageItem extends UIElementInterface {
    /**
     *
     * @param {ParentNode} parentNode
     * @param {string} pageSelector
     * @param {string} activePageSelector
     */
    constructor(parentNode, pageSelector, activePageSelector) {
        super();
        /**
         *
         * @type {ParentNode}
         * @private
         */
        this._node = parentNode;
        /**
         *
         * @type {string}
         * @private
         */
        this._pageSelector = pageSelector;
        /**
         *
         * @type {string}
         * @private
         */
        this._activePageSelector = activePageSelector;
        /**
         *
         * @type {Node|null}
         * @private
         */
        this._pageItem = null;
    }

    clean() {
        this._node.removeChild(this._pageItem);
    }

    clone() {
        const parentNode = this._node.cloneNode(true);
        return new UIPageItem(parentNode, this._pageSelector, this._activePageSelector);
    }

    /**
     *
     * @return {ParentNode}
     */
    getNode() {
        return this._node;
    }

    init() {
        this._pageItem = this._node.querySelector(this._pageSelector);
    }
}
