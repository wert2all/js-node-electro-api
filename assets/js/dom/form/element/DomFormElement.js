import DomFormElementInterface from "../DomFormElementInterface";
import DomFormElementValidatorNull from "../validators/DomFormElementValidatorNull";
import DomStyles from "../../utils/DomStyles";

/**
 * @class DomFormElement
 * @extends DomFormElementInterface
 * @type DomFormElementInterface
 */
export default class DomFormElement extends DomFormElementInterface {
    /**
     *
     * @param {HTMLElement} element
     * @param {DomFormElementViewHolder|null} viewHolder
     * @param {DomFormElementValidatorInterface} validator
     */
    constructor(element, viewHolder = null, validator = null) {
        super();
        /**
         *
         * @type {HTMLElement}
         * @protected
         */
        this._element = element;
        /**
         *
         * @type {DomFormElementValidatorInterface}
         * @private
         */
        this._validator = validator == null ? new DomFormElementValidatorNull() : validator;
        /**
         *
         * @type {DomFormElementViewHolder|null}
         * @private
         */
        this._viewHolder = viewHolder;
        /**
         *
         * @type {string}
         * @private
         */
        this._errorStyle = "uk-form-danger";
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

        const isValid = this._validator.validate(this.getValue());
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
        if (this._viewHolder != null) {
            this._viewHolder.setError(message);
        }
        return this;
    }

    /**
     *
     * @private
     */
    _cleanErrors() {
        if (this._viewHolder != null) {
            this._viewHolder.cleanErrors();
        }
        this._element = new DomStyles().removeClass(this._element, this._errorStyle);
    }
}
