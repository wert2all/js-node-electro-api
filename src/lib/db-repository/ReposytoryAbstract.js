import ImplementationError from "../implementation-error/ImplementationError";
import RepositoryErrorNoConnection from "./error/RepositoryErrorNoConnection";

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
     * @param {DefinitionOrder | null} order
     * @param {DefinitionLimit | null} limit
     * @param {null| Object<string, string>} fields
     * @return {Promise<EntityInterface[]>}
     */
    async fetchData(entity, order = null, limit = null, fields = null) {
        const list = await this._fetch(this.getDefinition(), entity, order, limit, fields);
        return Promise.resolve(list.map((value) => entity.create(value)));
    }

    /**
     *
     * @param {EntityInterface} entity
     * @return {Promise<number>}
     */
    async fetchCount(entity) {
        //FIXME count
        const result = await this._fetch(this.getDefinition(), entity, null, null, { count: "count(*)" });
        return result.pop().count;
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {EntityInterface} entity
     * @param {DefinitionOrder | null} order
     * @param {DefinitionLimit | null} limit
     * @param {null| Object<string, string>} fields
     * @return {Promise<Array>}
     * @private
     */
    async _fetch(definition, entity, order = null, limit = null, fields = null) {
        if (this._connection == null) {
            return Promise.reject(new RepositoryErrorNoConnection());
        }
        const filter = this._filterFactory().create(entity);
        return await this._connection.select(definition, filter, order, limit, fields);
    }

    /**
     * @abstract
     * @protected
     * @return FilterFactoryInterface
     */
    _filterFactory() {
        throw new ImplementationError(this, "_filterFactory");
    }

    /**
     *
     * @abstract
     * @return DefinitionTableInterface
     */
    getDefinition() {
        throw new ImplementationError(this, "_getDefinition");
    }
}
