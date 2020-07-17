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
     * @param {UINotifyInterface} notify
     * @param {UIPager} pager
     */
    constructor(authElement, gridElement, loaderElement, contentElement, notify, pager) {
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
        /**
         *
         * @type {number}
         * @private
         */
        this._contentIndex = this._elements.push(contentElement) - 1;
        /**
         *
         * @type {number}
         * @private
         */
        this._pagerIndex = this._elements.push(pager) - 1;
        /**
         *
         * @type {UINotifyInterface}
         * @private
         */
        this._notify = notify;
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
        return this._elements[this._gridIndex].clone();
    }

    /**
     *
     * @return {UIElementInterface}
     */
    getLoader() {
        return this._elements[this._loaderIndex].clone();
    }

    /**
     * @return {UIContentElementInterface}
     */
    getContent() {
        return this._elements[this._contentIndex];
    }

    /**
     *
     * @return {UINotifyInterface}
     */
    getNotify() {
        return this._notify;
    }

    /**
     *
     * @return {UIPager}
     */
    getPager() {
        return this._elements[this._pagerIndex];
    }
}
