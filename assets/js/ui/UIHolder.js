import UIInterface from './UIInterface';

/**
 * @class UIHolder
 * @extends UIInterface
 * @type UIInterface
 */
export default class UIHolder extends UIInterface {
    constructor() {
        super();
        /**
         *
         * @type {UIElementInterface[]}
         * @private
         */
        this._elements = [];
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
}
