import ConnectionInterface from '../ConnectionInterface';
import ImplementationError from '../../implementation-error/ImplementationError';

/**
 * @class SQLiteConnection
 * @type ConnectionInterface
 * @extends ConnectionInterface
 */
export default class SQLiteConnection extends ConnectionInterface {
    /**
     *
     * @param {string} connectionURI
     */
    constructor(connectionURI) {
        super();
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @return {Promise<Array>}
     */
    async select(definition, filter) {
        const sql = this._buildSelect(definition, filter);
        return this._query(sql, this._buildWhereData(filter));
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @return {string}
     * @private
     */
    _buildSelect(definition, filter) {
        const whereCond = filter.getFilterData()
            .map(filterData => filterData.field + filterData.sign + '?');
        return 'Select * from '
            + definition.getTableName()
            + this._buildWhere(whereCond)
            + this._buildOrder()
            + this._buildLimit();
    }

    /**
     *
     * @param {string} sql
     * @param {Array<string>} whereData
     * @return {Promise<Array>}
     * @private
     */
    async _query(sql, whereData) {
        const connection = await this._connect();
        return Promise.reject(new ImplementationError(this, '_query'));
    }

    /**
     *
     * @return {Promise<>}
     * @private
     */
    async _connect() {
        return Promise.reject(new ImplementationError(this, '_connect'));
    }

    /**
     *
     * @param {Array<string>} whereCond
     * @return {string}
     * @private
     */
    _buildWhere(whereCond) {
        return whereCond.length > 0 ? ' where ' + whereCond.join(' and ') : '';
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildOrder() {
        //TODO
        return '';
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildLimit() {
        //TODO
        return ' ';
    }

    /**
     *
     * @param {FilterInterface} filter
     * @return {Array<string>}
     * @private
     */
    _buildWhereData(filter) {
        return filter.getFilterData().map(filterData => filterData.value);
    }
}
