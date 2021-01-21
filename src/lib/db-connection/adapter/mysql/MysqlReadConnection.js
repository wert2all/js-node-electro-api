import ReadConnectionInterface from "../../ReadConnectionInterface";
import MysqlQueryExecutor from "./MysqlQueryExecutor";
import MysqlQueryDataProvider from "./MysqlQueryDataProvider";
import MysqlSelectSQLBuilder from "./builder/MysqlSelectSQLBuilder";

/**
 * @class MysqlReadConnection
 * @extends ReadConnectionInterface
 * @type ReadConnectionInterface
 */
export default class MysqlReadConnection extends ReadConnectionInterface {
    /**
     *
     * @param {ConnectionInterface} connectionDelegate
     */
    constructor(connectionDelegate) {
        super();
        /**
         *
         * @type {ConnectionInterface}
         * @private
         */
        this._connectionDelegate = connectionDelegate;
        /**
         *
         * @type {MysqlQueryExecutor}
         * @private
         */
        this._queryExecutor = new MysqlQueryExecutor(this._connectionDelegate);
        /**
         *
         * @type {MysqlQueryDataProvider}
         * @private
         */
        this._queryDataProvider = new MysqlQueryDataProvider();
        /**
         *
         * @type {MysqlSelectSQLBuilder}
         * @private
         */
        this._buiderSelect = new MysqlSelectSQLBuilder();
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
            if (definition.isColumn(filter.field)) {
                data[filter.field] = " " + filter.sign + " ?";
            }
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

    getConnection() {
        return this._connectionDelegate.getConnection();
    }
}
