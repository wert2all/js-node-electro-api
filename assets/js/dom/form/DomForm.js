import DomFormInterface from './DomFormInterface';

/**
 * @class DomForm
 * @extends DomFormInterface
 * @type DomFormInterface
 */
export default class DomForm extends DomFormInterface {
    /**
     *
     * @param {Object<string, DomFormElementInterface>} elements
     */
    constructor(elements = {}) {
        super();
        /**
         *
         * @type {Object<string, DomFormElementInterface>}
         * @private
         */
        this._elements = elements;
    }

    /**
     *
     * @param {function} submitFunction
     */
    // eslint-disable-next-line no-unused-vars
    init(submitFunction) {
    }

    /**
     *
     * @param {string} elementName
     * @param {string} value
     * @return DomFormInterface
     */
    setElement(elementName, value) {
        /**
         *
         * @type {DomFormElementInterface}
         */
        const element = this._getElement(elementName);
        if (element != null) {
            element.setValue(value);
        }
        return this;
    }

    /**
     * @return {Promise<Boolean>}
     */
    submit() {
        return Promise.resolve(false);
    }

    /**
     *
     * @param {string} elementName
     * @return {null|DomFormElementInterface}
     * @private
     */
    _getElement(elementName) {
        if (this._elements.hasOwnProperty(elementName)) {
            return this._elements[elementName];
        }
        return null;
    }

    /**
     *
     * @return {boolean}
     */
    validate() {
        return (
            Object.keys(this._elements).map(key => this._elements[key])
                .map(element => element.validate())
                .filter(value => !value)
                .length === 0
        );
    }

    /**
     *
     * @return {FormData}
     */
    getFormData() {
        const formData = new FormData();
        Object.keys(this._elements)
            .map(key => {
                formData.set(key, this._elements[key].getValue());
            });
        return formData;
    }
}
