/**
 * @class DomFormElementInterface
 * @interface
 * @abstract
 */
export default class DomFormElementInterface {
    /**
     *
     * @param {string} value
     * @return DomFormElementInterface
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    setValue(value) {}

    /**
     * @return {string}
     * @abstract
     */
    getValue() {}

    /**
     * @abstract
     * @return boolean
     */
    validate() {}

    /**
     * @abstract
     * @return DomFormElementInterface
     */
    setFocus() {}

    /**
     * @abstract
     * @param {string} message
     * @return DomFormElementInterface
     */
    // eslint-disable-next-line no-unused-vars
    setError(message) {}
}
