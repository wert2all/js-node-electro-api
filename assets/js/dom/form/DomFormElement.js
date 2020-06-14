import DomFormElementInterface from './DomFormElementInterface';

/**
 * @class DomFormElement
 * @extends DomFormElementInterface
 * @type DomFormElementInterface
 */
export default class DomFormElement extends DomFormElementInterface {
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

    /**
     *
     * @return {string}
     */
    getValue() {
        return this._element.value;
    }

    /**
     *
     * @param {string} value
     * @return DomFormElementInterface
     */
    setValue(value) {
        this._element.value = value;
        return this;
    }
}
