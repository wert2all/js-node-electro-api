import UIImageActionsInterface from '../UIImageActionsInterface';

/**
 * @class UIImageAction
 * @type UIImageActionsInterface
 * @extends UIImageActionsInterface
 */
export default class UIImageAction extends UIImageActionsInterface {
    /**
     *
     * @param {DomListeners} domListeners
     * @param {string} selector
     * @param {function} action
     */
    constructor(domListeners, selector, action = Function.prototype) {
        super();
        /**
         *
         * @type {DomListeners}
         * @private
         */
        this._domListener = domListeners;
        /**
         *
         * @type {string}
         * @private
         */
        this._selector = selector;
        /**
         *
         * @type {Function}
         * @private
         */
        this._action = action;
    }

    /**
     *
     * @param {ParentNode} node
     * @param {ImageData} imageData
     */
    applyData(node, imageData) {
        const actionIcon = this._domListener.removeEventListeners(
            node.querySelector(this._selector)
        );
        actionIcon.addEventListener('click', (event) => {
            event.preventDefault();
            this._action(imageData);
        });
    }
}
