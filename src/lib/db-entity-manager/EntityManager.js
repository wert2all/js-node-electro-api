/**
 * @class EntityManager
 */
import EntityManagerError from './error/EntityManagerError';
import Filter from '../db-filter/Filter';

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
            if (await this._isExist(definition, entity)) {
                await this._connection.update(definition, entity.getData());
            } else {
                const primaryFieldValue = await this._connection
                    .insert(definition, entity.getData());
                entity.setValue(
                    definition.getPrimaryColumn().getColumnName(),
                    primaryFieldValue
                );
            }
            return Promise.resolve(entity);
        } else {
            return Promise.reject(new EntityManagerError());
        }
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {EntityInterface} entity
     * @return Promise<boolean>}
     * @private
     */
    async _isExist(definition, entity) {
        const primaryValue = entity.getValue(
            definition.getPrimaryColumn().getColumnName()
        );
        if (primaryValue !== null) {
            const filter = new Filter();
            filter.addColumn(definition.getPrimaryColumn(), primaryValue);
            const entityDbValue = await this._connection.select(definition, filter);
            return Promise.resolve(entityDbValue.length > 0);
        } else {
            return Promise.resolve(false);
        }
    }
}
