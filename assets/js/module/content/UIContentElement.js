import UIContentElementInterface from './UIContentElementInterface';

/**
 * @class UIContentElement
 * @extends UIContentElementInterface
 * @type UIContentElementInterface
 */
export default class UIContentElement extends UIContentElementInterface {

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
        this._element = element;
    }

}
