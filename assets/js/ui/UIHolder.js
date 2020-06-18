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
     * @param {UIGridElementInterface} gridElement
     * @param {UIElementInterface} loaderElement
     * @param {UIContentElementInterface} contentElement
     */
    constructor(authElement, gridElement, loaderElement, contentElement) {
        super();
        /**
         *
         * @type {UIElementInterface[]}
         * @private
         */
        this._elements = [];
        /**
         *
         * @type {number}
         * @private
         */
        this._authIndex = this._elements.push(authElement) - 1;
        /**
         *
         * @type {number}
         * @private
         */
        this._gridIndex = this._elements.push(gridElement) - 1;
        /**
         *
         * @type {number}
         * @private
         */
        this._loaderIndex = this._elements.push(loaderElement) - 1;
        this._contentIndex = this._elements.push(contentElement) - 1;
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
     * @return {UIAuthElementInterface}
     */
    getAuthElement() {
        return this._elements[this._authIndex];
    }

    /**
     * @return {UIGridElementInterface}
     */
    getGrid() {
        return this._elements[this._gridIndex];
    }

    /**
     *
     * @return {UIElementInterface}
     */
    getLoader() {
        return this._elements[this._loaderIndex];
    }

    /**
     * @return {UIContentElementInterface}
     */
    getContent() {
        return this._elements[this._contentIndex];
    }
}
