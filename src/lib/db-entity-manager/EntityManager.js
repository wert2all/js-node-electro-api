/**
 * @class EntityManager
 */
import EntityManagerError from "./error/EntityManagerError";
import Filter from "../db-filter/Filter";
import EntityInterface from "../db-entity/EntityInterface";
import DefinitionLimit from "../db-definition/DefinitionLimit";

export default class EntityManager {
    /**
     *
     * @param {ReadConnectionInterface} readConnection
     * @param {WriteConnectionInterface} writeConnection
     */
    constructor(readConnection, writeConnection) {
        /**
         *
         * @type {ReadConnectionInterface}
         * @private
         */
        this._readConnection = readConnection;
        /**
         *
         * @type {WriteConnectionInterface}
         * @private
         */
        this._writeConnection = writeConnection;
    }

    /**
     *
     * @return {ReadConnectionInterface}
     */
    getReadConnection() {
        return this._readConnection;
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {EntityInterface} entity
     * @return {Promise<EntityInterface>}
     */
    async save(definition, entity) {
        if (this._readConnection !== null && this._writeConnection !== null) {
            if (await this._isExist(definition, entity)) {
                await this._writeConnection.update(definition, entity.getData());
            } else {
                const rowIdValue = await this._writeConnection.insert(definition, entity.getData());
                entity.setValue(EntityInterface.ROW_ID, rowIdValue);
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
        const primaryValue = entity.getValue(definition.getPrimaryColumn().getColumnName());
        if (primaryValue != null) {
            const filter = new Filter();
            filter.addColumn(definition.getPrimaryColumn(), primaryValue);
            const entityDbValue = await this._readConnection.select(
                definition,
                filter,
                null,
                new DefinitionLimit(0, 1)
            );
            return Promise.resolve(entityDbValue.length > 0);
        } else {
            return Promise.resolve(false);
        }
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {string} primaryValue
     * @return Promise<void>}
     * @private
     */
    async delete(definition, primaryValue) {
        return this._writeConnection.delete(definition, primaryValue);
    }
}
