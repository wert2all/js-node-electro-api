import UIInterface from './interfaces/UIInterface';

/**
 * @class UIHolder
 * @extends UIInterface
 * @type UIInterface
 */
export default class UIHolder extends UIInterface {
    /**
     *
     * @param {UIAuthElementInterface} authElement
     */
    constructor(authElement) {
        super();
        /**
         *
         * @type {UIElementInterface[]}
         * @private
         */
        this._elements = [];
        this._elements.push(authElement);
        /**
         *
         * @type {number}
         * @private
         */
        this._authIndex = this._elements.length - 1;
    }

    /**
     * @return {void}
     */
    clean() {
        this._elements.forEach(element => element.clean());
    }

    /**
     * @return {void}
     */
    init() {
        this._elements.forEach(element => element.init());
    }

    /**
     * @return {UIElementInterface}
     */
    getAuthElement() {
        return this._elements[this._authIndex];
    }
}
