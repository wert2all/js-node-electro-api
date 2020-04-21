import ImplementationError from '../implementation-error/ImplementationError';

export default class RepositoryAbstract {
    /**
     *
     * @param {ConnectionInterface} connection
     */
    constructor(connection) {
        /**
         *
         * @type {ConnectionInterface}
         */
        this.connection = connection;
    }

    /**
     *
     * @param {EntityInterface} entity
     * @return {Promise<EntityInterface[]>}
     */
    async fetchData(entity) {
        const filter = this._filterFactory().create(entity);
        const list = await this.connection.select(this._getDefinition(), filter);
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
     * @protected
     * @return DefinitionTableInterface
     */
    _getDefinition() {
        throw new ImplementationError(this, '_getDefinition');
    }
}
