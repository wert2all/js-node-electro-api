/**
 * @class EntityManager
 */
import ImplementationError from '../implementation-error/ImplementationError';

export default class EntityManager {
    /**
     *
     * @param {ConnectionInterface} connection
     */
    constructor(connection = null) {
        /**
         *
         * @type {ConnectionInterface}
         * @private
         */
        this._connection = connection;
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {EntityInterface} entity
     * @return {Promise<EntityInterface>}
     */
    save(definition, entity) {
        throw new ImplementationError(this, 'save');
    }
}
