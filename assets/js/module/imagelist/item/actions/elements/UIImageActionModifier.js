import UIImageActionsModifierInterface from "../UIImageActionsModifierInterface";

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
     * @param {UIElementListInterface} elementList
     */
    applyData(node, imageData, elementList = null) {
        node.querySelector(this._selector).addEventListener("click", (event) => {
            event.preventDefault();
            this._onClickAction.click(imageData, elementList);
        });
    }
}
