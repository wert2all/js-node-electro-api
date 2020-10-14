/**
 * @class MLLogsSelectors
 */
export default class MLLogsSelectors {
    /**
     *
     * @param {string} tableBodySelector
     * @param {string} rowSelector
     * @param {string} statusSelector
     * @param {string} aliasSelector
     * @param {string} messageSelector
     */
    constructor(tableBodySelector, rowSelector, statusSelector, aliasSelector, messageSelector) {
        this._tableBodySelector = tableBodySelector;
        this._rowSelector = rowSelector;
        this._statusSelector = statusSelector;
        this._aliasSelector = aliasSelector;
        this._messageSelector = messageSelector;
    }

    /**
     *
     * @return {string}
     */
    getTableBodySelector() {
        return this._tableBodySelector;
    }

    /**
     *
     * @return {string}
     */
    getRowSelector() {
        return this._rowSelector;
    }

    /**
     *
     * @return {string}
     */
    getStatusSelector() {
        return this._statusSelector;
    }

    /**
     *
     * @return {string}
     */
    getAliasSelector() {
        return this._aliasSelector;
    }

    /**
     *
     * @return {string}
     */
    getMessageSelector() {
        return this._messageSelector;
    }
}
