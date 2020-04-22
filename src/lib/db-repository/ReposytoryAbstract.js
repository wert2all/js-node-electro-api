import ImplementationError from '../implementation-error/ImplementationError';
import RepositoryErrorNoConnection from './error/RepositoryErrorNoConnection';

/**
 * @abstract
 * @class RepositoryAbstract
 */
export default class RepositoryAbstract {
    /**
     *
     * @param {ConnectionInterface} connection
     */
    constructor(connection = null) {
        /**
         *
         * @type {ConnectionInterface|null}
         * @private
         */
        this._connection = connection;
    }

    /**
     *
     * @param {ConnectionInterface} connection
     */
    setConnection(connection) {
        this._connection = connection;
    }

    /**
     *
     * @return {ConnectionInterface|null}
     */
    getConnection() {
        return this._connection;
    }

    /**
     *
     * @param {EntityInterface} entity
     * @return {Promise<EntityInterface[]>}
     */
    async fetchData(entity) {
        if (this._connection == null) {
            return Promise.reject(new RepositoryErrorNoConnection());
        }
        const filter = this._filterFactory().create(entity);
        const list = await this._connection.select(this.getDefinition(), filter);
        return Promise.resolve(list.map(value => entity.create(value)));
    }

    /**
     * @abstract
     * @protected
     * @return FilterFactoryInterface
     */
    _filterFactory() {
        throw new ImplementationError(this, '_filterFactory');
    }

    /**
     *
     * @abstract
     * @return DefinitionTableInterface
     */
    getDefinition() {
        throw new ImplementationError(this, '_getDefinition');
    }
}
