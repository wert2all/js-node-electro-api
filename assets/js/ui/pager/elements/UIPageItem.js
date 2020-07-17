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
        /**
         *
         * @type {number}
         * @private
         */
        this._pageNumber = 1;
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
     * @return {Node}
     */
    getNode() {
        return this._pageItem;
    }

    init() {
        this._pageItem = this._node.querySelector(this._pageSelector);
    }

    /**
     *
     * @return {UIPageItem}
     */
    setActive() {
        this._pageItem = this._node.querySelector(this._activePageSelector);
        return this;
    }

    /**
     *
     * @param {number} number
     * @return UIPageItem
     */
    setNumber(number) {
        this._pageItem.innerHTML = number;
        this._pageNumber = number;
        return this;
    }

    /**
     *
     * @param {function} func
     * @return {UIPageItem}
     */
    setClickListener(func = Function.prototype) {
        this._pageItem = this._pageItem.cloneNode(true);
        this._pageItem.addEventListener(
            'click',
            (event) => func(event, this._pageNumber));
        return this;
    }
}
