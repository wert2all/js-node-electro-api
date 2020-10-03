import UIFormViewInterface from './UIFormViewInterface';

/**
 * @class UIFormView
 * @extends UIFormViewInterface
 * @type UIFormViewInterface
 */
export default class UIFormView extends UIFormViewInterface {
    /**
     *
     * @param {DomFormInterface} formDom
     * @param {HTMLFormElement} formNode
     * @param {UIElementInterface|null} loader
     */
    constructor(formDom, formNode, loader = null) {
        super();
        /**
         *
         * @type {DomFormInterface}
         * @private
         */
        this._form = formDom;
        /**
         *
         * @type {HTMLFormElement}
         * @private
         */
        this._formNode = formNode;
        /**
         *
         * @type {UIElementInterface|null}
         * @private
         */
        this._loader = loader;
        /**
         *
         * @type {null| UIElementInterface}
         * @private
         */
        this._showedLoader = null;
    }

    /**
     *
     * @param {function} submitFunction
     */
    init(submitFunction) {
        this._form.init(submitFunction);
    }

    /**
     *
     * @param {string} elementName
     * @param {string} value
     * @return {UIFormViewInterface}
     */
    setElement(elementName, value) {
        this._form.setElement(elementName, value);
        return this;
    }

    /**
     *
     * @return {Promise<boolean>}
     */
    submit() {
        return Promise.resolve(false);
    }

    /**
     *
     * @return {UIFormViewInterface}
     */
    hideLoader() {
        if (this._loader != null) {
            this._formNode.style.visibility = 'visible';
            if (this._showedLoader != null) {
                this._formNode.parentNode.removeChild(this._showedLoader);
            }
            this._showedLoader = null;
        }
        return this;
    }

    /**
     *
     * @return {UIFormViewInterface}
     */
    showLoader() {
        if (this._loader != null) {
            this._formNode.style.visibility = 'hidden';
            this._showedLoader = this._loader.clone().getNode();
            this._formNode.parentNode.append(this._showedLoader);
        }
        return this;
    }

    /**
     *
     * @return {boolean}
     */
    validate() {
        return this._form.validate();
    }

    /**
     *
     * @return {FormData}
     */
    getFormData() {
        return this._form.getFormData();
    }

    /**
     *
     * @return {Object<string, string>}
     */
    getRequestFormData() {
        return this._form.getRequestFormData();
    }

    /**
     *
     * @param {string} elementName
     * @return {DomFormElementInterface|null}
     */
    getElement(elementName) {
        return this._form.getElement(elementName);
    }
}
