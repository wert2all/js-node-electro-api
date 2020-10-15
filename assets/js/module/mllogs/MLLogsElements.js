export default class MLLogsElements {
    /**
     *
     * @param {HTMLTableElement} tableElement
     * @param {HTMLElement} tableBody
     * @param {HTMLTableRowElement} rowElement
     * @param {HTMLElement} statusElement
     * @param {HTMLElement} aliasElement
     * @param {HTMLElement} messageElement
     */
    constructor(tableElement, tableBody, rowElement, statusElement, aliasElement, messageElement) {
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
        this._tableBody = tableBody;
        /**
         *
         * @type {HTMLTableRowElement}
         * @private
         */
        this._rowElement = rowElement;
        /**
         *
         * @type {HTMLElement}
         * @private
         */
        this._statusElement = statusElement;
        /**
         *
         * @type {HTMLElement}
         * @private
         */
        this._aliasElement = aliasElement;
        /**
         *
         * @type {HTMLElement}
         * @private
         */
        this._messageElement = messageElement;
    }

    /**
     *
     * @return {HTMLTableElement}
     */
    getTableElement() {
        return this._tableElement;
    }

    /**
     *
     * @return {HTMLElement}
     */
    getTableBody() {
        return this._tableBody;
    }

    /**
     *
     * @return {HTMLTableRowElement}
     */
    getRowElement() {
        return this._rowElement;
    }

    /**
     *
     * @return {HTMLElement}
     */
    getStatusElement() {
        return this._statusElement;
    }

    /**
     *
     * @return {HTMLElement}
     */
    getAliasElement() {
        return this._aliasElement;
    }

    /**
     *
     * @return {HTMLElement}
     */
    getMessageElement() {
        return this._messageElement;
    }
}
