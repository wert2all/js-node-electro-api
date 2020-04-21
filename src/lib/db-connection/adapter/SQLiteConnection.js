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
        return this._query(sql);
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @return {string}
     * @private
     */
    _buildSelect(definition, filter) {
        throw  new ImplementationError(this, '_buildSelect');
    }

    /**
     *
     * @param {string} sql
     * @return {Promise<Array>}
     * @private
     */
    async _query(sql) {
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
}
