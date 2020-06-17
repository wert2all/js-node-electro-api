import UIElementInterface from '../../ui/interfaces/UIElementInterface';

/**
 * @class UILoader
 * @type UIElementInterface
 * @extends UIElementInterface
 */
export default class UILoader extends UIElementInterface {
    /**
     *
     * @param {Node} element
     */
    constructor(element) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._loader = element;
    }
}
