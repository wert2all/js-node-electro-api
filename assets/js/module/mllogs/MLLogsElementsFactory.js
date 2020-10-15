import MLLogsElements from "./MLLogsElements";

/**
 * @class MLLogsElementsFactory
 */
export default class MLLogsElementsFactory {
    /**
     *
     * @param {HTMLTableElement} tableElement
     */
    constructor(tableElement) {
        /**
         *
         * @type {HTMLTableElement}
         * @private
         */
        this._tableElement = tableElement;
    }

    /**
     *
     * @param {MLLogsSelectors} selectors
     * @return {MLLogsElements}
     */
    factory(selectors) {
        const tableBody = this._tableElement.querySelector(selectors.getTableBodySelector());
        const rowElement = tableBody.querySelector(selectors.getRowSelector()).cloneNode(true);
        const statusElement = tableBody.querySelector(selectors.getStatusSelector()).cloneNode(true);
        const aliasElement = tableBody.querySelector(selectors.getAliasSelector()).cloneNode(true);
        const messageElement = tableBody.querySelector(selectors.getMessageSelector()).cloneNode(true);

        return new MLLogsElements(
            this._tableElement,
            tableBody,
            rowElement,
            statusElement,
            aliasElement,
            messageElement
        );
    }
}
