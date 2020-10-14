import UIElementListInterface from "../../ui/interfaces/element/UIElementListInterface";

/**
 * @class UIMLLogs
 * @extends UIElementListInterface
 * @type UIElementListInterface
 */
export default class UIMLLogs extends UIElementListInterface {
    static HIDDEN_STYLE = "uk-invisible";

    /**
     *
     * @param {DomFormElementInterface} entityId
     * @param {HTMLElement} spinnerElement
     * @param {HTMLTableElement} tableElement
     * @param {Api} api
     * @param {MLLogsSelectors} selectors
     */
    constructor(entityId, spinnerElement, tableElement, api, selectors) {
        super();
        /**
         *
         * @type {HTMLTableElement}
         * @private
         */
        this._tableElement = tableElement;
        /**
         *
         * @type {HTMLElement}
         * @private
         */
        this._spinnerElement = spinnerElement;
        /**
         *
         * @type {DomFormElementInterface}
         * @private
         */
        this._entityId = entityId;
        /**
         *
         * @type {Api}
         * @private
         */
        this._api = api;
        /**
         *
         * @type {MLLogsSelectors}
         * @private
         */
        this._selectors = selectors;
        /**
         *
         * @type {null|HTMLElement}
         * @private
         */
        this._tableBody = null;
        /**
         *
         * @type {null|HTMLTableRowElement}
         * @private
         */
        this._rowElement = null;
        /**
         *
         * @type {null|HTMLElement}
         * @private
         */
        this._statusElement = null;
        /**
         *
         * @type {null|HTMLElement}
         * @private
         */
        this._aliasElement = null;
        /**
         *
         * @type {null|HTMLElement}
         * @private
         */
        this._messageElement = null;
    }

    init() {
        this._tableBody = this._tableElement.querySelector(this._selectors.getTableBodySelector());
        this._rowElement = this._tableBody.querySelector(this._selectors.getRowSelector()).cloneNode(true);
        this._statusElement = this._tableBody.querySelector(this._selectors.getStatusSelector()).cloneNode(true);
        this._aliasElement = this._tableBody.querySelector(this._selectors.getAliasSelector()).cloneNode(true);
        this._messageElement = this._tableBody.querySelector(this._selectors.getMessageSelector()).cloneNode(true);
    }

    refresh() {
        this._cleanTableRows();
        this._hideTable()._showSpinner();

        console.log(this._entityId.getValue());
    }

    /**
     *
     * @return {UIMLLogs}
     * @private
     */
    _showSpinner() {
        this._spinnerElement.classList.remove(UIMLLogs.HIDDEN_STYLE);
        return this;
    }

    /**
     *
     * @return {UIMLLogs}
     */
    hideSpinner() {
        this._spinnerElement.classList.add(UIMLLogs.HIDDEN_STYLE);
        return this;
    }

    /**
     *
     * @return {UIMLLogs}
     * @private
     */
    _showTable() {
        this._tableElement.classList.remove(UIMLLogs.HIDDEN_STYLE);
        return this;
    }

    /**
     *
     * @return {UIMLLogs}
     */
    _hideTable() {
        this._tableElement.classList.add(UIMLLogs.HIDDEN_STYLE);
        return this;
    }

    /**
     *
     * @return {UIMLLogs}
     * @private
     */
    _cleanTableRows() {
        this._tableBody
            .querySelectorAll(this._selectors.getRowSelector())
            .forEach((row) => this._tableBody.removeChild(row));
        return this;
    }
}
