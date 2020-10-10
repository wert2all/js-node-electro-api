import DomFormElementValidatorInterface from "../DomFormElementValidatorInterface";

/**
 * @class DomFormElementValidatorNull
 * @extends DomFormElementValidatorInterface
 * @type DomFormElementValidatorInterface
 */
// eslint-disable-next-line max-len
export default class DomFormElementValidatorNull extends DomFormElementValidatorInterface {
    /**
     *
     * @return {boolean}
     */
    // eslint-disable-next-line no-unused-vars
    validate(value) {
        return true;
    }

    /**
     *
     * @return {string}
     */
    getValidationError() {
        return "";
    }
}
