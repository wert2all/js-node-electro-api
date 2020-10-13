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
     */
    constructor(entityId, spinnerElement, tableElement, api) {
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
    }

    init() {}

    refresh() {
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
}
