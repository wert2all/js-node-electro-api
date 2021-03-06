/**
 * @class DomFormInterface
 * @interface
 * @abstract
 */
export default class DomFormInterface {
    /**
     *
     * @param {function} submitFunction
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    init(submitFunction) {}

    /**
     *
     * @param {string} elementName
     * @param {string} value
     * @return DomFormInterface
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    setElement(elementName, value) {}

    /**
     * @abstract
     * @param {string} elementName
     * @return {DomFormElementInterface|null}
     */
    // eslint-disable-next-line no-unused-vars
    getElement(elementName) {}

    /**
     * @return {Promise<Boolean>}
     * @abstract
     */
    submit() {}

    /**
     * @abstract
     * @return boolean
     */
    validate() {}

    /**
     * @return FormData
     */
    getFormData() {}

    /**
     * @abstract
     * @return {Object<string, string>}
     */
    getRequestFormData() {}
}
