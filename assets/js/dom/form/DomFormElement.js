import DomFormElementInterface from './DomFormElementInterface';
import DomFormElementValidatorNull from './validators/DomFormElementValidatorNull';
import DomStyles from '../utils/DomStyles';

/**
 * @class DomFormElement
 * @extends DomFormElementInterface
 * @type DomFormElementInterface
 */
export default class DomFormElement extends DomFormElementInterface {
    /**
     *
     * @param {HTMLElement} element
     * @param {DomFormElementViewHolder} viewHolder
     * @param {DomFormElementValidatorInterface} validator
     */
    constructor(element, viewHolder, validator = null) {
        super();
        /**
         *
         * @type {HTMLElement}
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
        /**
         *
         * @type {DomFormElementViewHolder}
         * @private
         */
        this._viewHolder = viewHolder;
        /**
         *
         * @type {string}
         * @private
         */
        this._errorStyle = 'uk-form-danger';
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
        this._cleanErrors();

        const isValid = this._validator.validate(this._element.value);
        if (!isValid) {
            this.setError(this._validator.getValidationError());
        }
        return isValid;
    }

    /**
     *
     * @return {DomFormElementInterface}
     */
    setFocus() {
        this._element.focus();
        return this;
    }

    /**
     *
     * @param {string} message
     * @return {DomFormElementInterface}
     */
    setError(message) {
        this._viewHolder.setError(message);
        return this;
    }

    /**
     *
     * @private
     */
    _cleanErrors() {
        this._viewHolder.cleanErrors();
        this._element = new DomStyles()
            .removeClass(this._element, this._errorStyle);
    }
}
