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
     * @param {Document} document
     * @param {string} selector
     * @param {UIImageActionInterface} onClickAction
     */
    constructor(domListeners, document, selector, onClickAction) {
        super();
        /**
         *
         * @type {DomListenersModifier}
         * @private
         */
        this._domListener = domListeners;
        /**
         *
         * @type {null|ImageData}
         * @private
         */
        this._imageData = null;
        /**
         *
         * @type {Document}
         * @private
         */
        this._document = document;
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
     * @param {ImageData} imageData
     */
    applyData(imageData) {
        this._imageData = imageData;
        const actionIcon = this._domListener.removeEventListeners(
            this._document.querySelector(this._selector)
        );
        actionIcon.addEventListener('click', (event) => {
            event.preventDefault();
            this._onClickAction.click(this._imageData);
        });
    }
}
