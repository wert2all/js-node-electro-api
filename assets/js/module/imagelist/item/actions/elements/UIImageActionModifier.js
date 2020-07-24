import UIImageActionsModifierInterface from '../UIImageActionsModifierInterface';

/**
 * @class UIImageActionModifier
 * @type UIImageActionsModifierInterface
 * @extends UIImageActionsModifierInterface
 */
export default class UIImageActionModifier extends UIImageActionsModifierInterface {
    /**
     *
     * @param {DomListenersModifier} domListeners
     * @param {DomListenersModifier} domListeners
     * @param {string} selector
     * @param {UIImageActionInterface} onClickAction
     */
    constructor(domListeners, selector, onClickAction) {
        super();
        /**
         *
         * @type {DomListenersModifier}
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
         * @type {UIImageActionInterface}
         * @private
         */
        this._onClickAction = onClickAction;
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
            this._onClickAction.click(imageData);
        });
    }
}
