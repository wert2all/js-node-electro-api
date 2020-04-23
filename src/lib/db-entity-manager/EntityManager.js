/**
 * @class EntityManager
 */
import EntityManagerError from './error/EntityManagerError';

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
    async save(definition, entity) {
        if (this._connection !== null) {
            if (entity.isLoaded()) {
                await this._connection.update(definition, entity.getData());
            } else {
                const primaryFieldValue = await this._connection
                    .insert(definition, entity.getData());
                entity.setValue(definition.getPrimaryField(), primaryFieldValue);
            }
            return Promise.resolve(entity);
        } else {
            return Promise.reject(new EntityManagerError());
        }
    }
}
