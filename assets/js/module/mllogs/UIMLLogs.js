import UIElementListInterface from "../../ui/interfaces/element/UIElementListInterface";
import LogItem from "./data/LogItem";

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
     * @param {MLLogsElementsFactory} elementsFactory
     * @param {Api} api
     * @param {AuthProviderInterface} authProvider
     * @param {UINotifyInterface} notify
     * @param {MLLogsSelectors} selectors
     */
    constructor(entityId, spinnerElement, elementsFactory, api, authProvider, notify, selectors) {
        super();

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
         * @type {AuthProviderInterface}
         * @private
         */
        this._authProvider = authProvider;
        /**
         *
         * @type {UINotifyInterface}
         * @private
         */
        this._notify = notify;
        /**
         *
         * @type {MLLogsSelectors}
         * @private
         */
        this._selectors = selectors;
        /**
         *
         * @type {null|MLLogsElements}
         * @private
         */
        this._elements = null;
        /**
         *
         * @type {MLLogsElementsFactory}
         * @private
         */
        this._elementsFactory = elementsFactory;
    }

    init() {
        this._elements = this._elementsFactory.factory(this._selectors);
    }

    refresh() {
        this._cleanTableRows()._hideTable()._showSpinner();
        this._api
            .getMlLogs(this._authProvider.getUserProfile(), this._entityId.getValue())
            .then((logs) => {
                this._showTable()._hideSpinner();
                if (logs.getStatus()) {
                    const data = logs.getData();
                    if (data.hasOwnProperty("logs")) {
                        const logsItems = data.logs
                            .map((oneLog) => LogItem.create(oneLog))
                            .filter((logItem) => !!logItem);
                        this._appendData(logsItems);
                    }
                } else {
                    this._notify.error(logs.getErrorMessage());
                }
            })
            .catch((error) => {
                this._showTable()._hideSpinner();
                this._notify.error(error.message);
            });
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
    _hideSpinner() {
        this._spinnerElement.classList.add(UIMLLogs.HIDDEN_STYLE);
        return this;
    }

    /**
     *
     * @return {UIMLLogs}
     * @private
     */
    _showTable() {
        this._elements.getTableElement().classList.remove(UIMLLogs.HIDDEN_STYLE);
        return this;
    }

    /**
     *
     * @return {UIMLLogs}
     */
    _hideTable() {
        this._elements.getTableElement().classList.add(UIMLLogs.HIDDEN_STYLE);
        return this;
    }

    /**
     *
     * @return {UIMLLogs}
     * @private
     */
    _cleanTableRows() {
        this._elements
            .getTableBody()
            .querySelectorAll(this._selectors.getRowSelector())
            .forEach((row) => this._elements.getTableBody().removeChild(row));
        return this;
    }

    /**
     *
     * @param {LogItem[]} logsItems
     * @private
     */
    _appendData(logsItems) {
        logsItems.map((item) => {
            this._elements.getAliasElement().innerText = item.getAlias();
            const statusElement = this._elements.getStatusElement();
            statusElement.classList.remove("uk-label-success");
            statusElement.classList.remove("uk-label-danger");
            statusElement.classList.add("uk-label-" + item.getStatus());
            this._elements.getMessageElement().innerText = item.getMessage();
            this._elements.getTableBody().appendChild(this._elements.getRowElement().cloneNode(true));
        });
    }
}
