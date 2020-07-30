import DomFormElementInterface from './DomFormElementInterface';
import DomFormElementValidatorNull from './validators/DomFormElementValidatorNull';

/**
 * @class DomFormElement
 * @extends DomFormElementInterface
 * @type DomFormElementInterface
 */
export default class DomFormElement extends DomFormElementInterface {
    /**
     *
     * @param {Node} element
     * @param {DomFormElementValidatorInterface} validator
     */
    constructor(element, validator = null) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._element = element;
        /**
         *
         * @type {DomFormElementValidatorInterface}
         * @private
         */
        this._validator = (validator == null)
            ? new DomFormElementValidatorNull()
            : validator;
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

    /**
     *
     * @return {boolean}
     */
    validate() {
        return this._validator.validate(this._element.value);
    }
}
