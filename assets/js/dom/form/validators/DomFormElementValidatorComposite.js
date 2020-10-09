import DomFormElementValidatorInterface from "../DomFormElementValidatorInterface";

/**
 * @class DomFormElementValidatorComposite
 * @type DomFormElementValidatorInterface
 * @extends DomFormElementValidatorInterface
 */
// eslint-disable-next-line max-len
export default class DomFormElementValidatorComposite extends DomFormElementValidatorInterface {
    /**
     *
     * @param {DomFormElementValidatorInterface[]} validators
     */
    constructor(validators) {
        super();
        /**
         *
         * @type {DomFormElementValidatorInterface[]}
         * @private
         */
        this._validators = validators;
        /**
         *
         * @type {string[]}
         * @private
         */
        this._errors = [];
    }

    /**
     *
     * @return {string}
     */
    getValidationError() {
        return this._errors.join("\n ");
    }

    /**
     *
     * @param {string}value
     * @return {boolean}
     */
    validate(value) {
        let validationResult = true;
        this._cleanErrors();
        this._validators.forEach((validator) => {
            const isValid = validator.validate(value);
            if (!isValid) {
                validationResult = false;
                this._errors.push(validator.getValidationError());
            }
        });
        return validationResult;
    }

    /**
     *
     * @private
     */
    _cleanErrors() {
        this._errors = [];
    }
}
