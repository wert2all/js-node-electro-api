// eslint-disable-next-line max-len
import DefinitionSQLSelectBuilderInterface from "../../../db-definition/builder/DefinitionSQLSelectBuilderInterface";

/**
 * @class SQLiteSelectSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLSelectBuilderInterface
 */
export default class SQLiteSelectSQLBuilder extends DefinitionSQLSelectBuilderInterface {
    constructor() {
        super();
        /**
         *
         * @type {null|DefinitionOrder}
         * @private
         */
        this._order = null;
        /**
         *
         * @type {null|DefinitionLimit}
         * @private
         */
        this._limit = null;
        /**
         *
         * @type {null| Object<string, string>}
         * @private
         */
        this._fields = null;
    }

    /**
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return string
     */
    buildSQL(definition, data) {
        const whereCond = Object.keys(data).map((key) => {
            return " " + key + " " + data[key];
        });
        return (
            "Select " +
            this._buildFields() +
            " from " +
            definition.getTableName() +
            this._buildWhere(whereCond) +
            this._buildOrder() +
            this._buildLimit()
        );
    }

    /**
     *
     * @param {Array<string>} whereCond
     * @return {string}
     * @private
     */
    _buildWhere(whereCond) {
        return whereCond.length > 0 ? " where " + whereCond.join(" and ") : "";
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildOrder() {
        let returnValue = "";
        if (this._order !== null) {
            returnValue = " order by " + this._order.getOrderField() + " " + this._order.getOrderType();
        }
        return returnValue;
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildLimit() {
        let returnValue = "";
        if (this._limit !== null) {
            returnValue = " limit " + this._limit.getFrom() + " , " + this._limit.getOffset();
        }
        return returnValue;
    }

    /**
     *
     * @param {DefinitionLimit} limit
     * @return {SQLiteSelectSQLBuilder}
     */
    applyLimit(limit) {
        this._limit = limit;
        return this;
    }

    /**
     *
     * @param {DefinitionOrder} order
     * @return {SQLiteSelectSQLBuilder}
     */
    applyOrder(order) {
        this._order = order;
        return this;
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildFields() {
        if (this._fields != null) {
            return Object.keys(this._fields)
                .map((alias) => `${this._fields[alias]} as ${alias}`)
                .join(", ");
        } else {
            return " * ";
        }
    }

    /**
     * @param {Object<string, string>| null} fields
     * @return DefinitionSQLSelectBuilderInterface
     */
    applyFields(fields) {
        this._fields = fields;
        return this;
    }
}
