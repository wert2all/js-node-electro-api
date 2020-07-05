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
     * @param {Document} document
     * @param {string} selector
     * @param {function} action
     */
    constructor(domListeners, document, selector, action = Function.prototype) {
        super();
        /**
         *
         * @type {DomListeners}
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
         * @type {Function}
         * @private
         */
        this._action = action;
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
            this._action(this._imageData);
        });
    }
}
