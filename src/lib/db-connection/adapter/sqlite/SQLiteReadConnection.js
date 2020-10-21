import ReadConnectionInterface from "../../ReadConnectionInterface";
import SQLiteSelectSQLBuilder from "./builder/SQLiteSelectSQLBuilder";
import QueryDataProvider from "./QueryDataProvider";
import SQLiteQueryExecutor from "./SQLiteQueryExecutor";
import SQLiteTableCreator from "./SQLiteTableCreator";

/**
 * @class SQLiteReadConnection
 * @extends ReadConnectionInterface
 * @type ReadConnectionInterface
 *
 */
export default class SQLiteReadConnection extends ReadConnectionInterface {
    constructor() {
        super();
        /**
         *
         * @type {SQLiteSelectSQLBuilder}
         * @private
         */
        this._buiderSelect = new SQLiteSelectSQLBuilder();
        /**
         *
         * @type {QueryDataProvider}
         * @private
         */
        this._queryDataProvider = new QueryDataProvider();
        /**
         *
         * @type {SQLiteQueryExecutor}
         * @private
         */
        this._queryExecutor = new SQLiteQueryExecutor();
    }

    /**
     *
     * @param serverConnection
     */
    setServer(serverConnection) {
        this._queryExecutor.setServer(serverConnection);
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @param {DefinitionOrder | null} order
     * @param {DefinitionLimit | null} limit
     * @param {null| Object<string, string>} fields
     * @return {Promise<Array>}
     */
    async select(definition, filter, order = null, limit = null, fields = null) {
        let data = {};
        filter.getFilterData().forEach((filter) => {
            data[filter.field] = " " + filter.sign + " :" + filter.field;
        });
        const sql = this._buiderSelect
            .applyFields(fields)
            .applyLimit(limit)
            .applyOrder(order)
            .buildSQL(definition, data);
        data = {};
        filter.getFilterData().map((filter) => {
            data[filter.field] = filter.value;
        });
        return this._queryExecutor.fetch(sql, this._queryDataProvider.buildQueryData(definition, data));
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     */
    setDispatcher(dispatcher) {
        this._queryExecutor.setDispatcher(dispatcher);
    }
}
