import ExtendedValuesDefinition from "../db/definition/ExtendedValuesDefinition";
import ExtendedValuesEntity from "../data/entity/ExtendedValuesEntity";
import ExtendedValuesRepository from "../db/repository/ExtendedValuesRepository";

/**
 * @class ExtendedValuesEntityManager
 */
export default class ExtendedValuesEntityManager {
    /**
     *
     * @param {EntityManager} em
     */
    constructor(em) {
        /**
         *
         * @type {EntityManager}
         * @private
         */
        this._em = em;
        this._repository = new ExtendedValuesRepository();
        this._repository.setConnection(this._em.getReadConnection());
    }

    /**
     *
     * @param {ExtendedValuesEntity} entity
     */
    async save(entity) {
        const ret = [];
        const entities = this._makeEntities(entity);
        await this._deleteEntities(ExtendedValuesEntity.createExtended(entity.getEntityType(), entity.getEntityId()));
        entities.forEach((entity) => {
            ret.push(this._em.save(this._repository.getDefinition(), entity));
        });
        return ret;
    }

    /**
     *
     * @param {ExtendedValuesEntity} entity
     * @return {ExtendedValuesEntity[]}
     * @private
     */
    _makeEntities(entity) {
        return Object.keys(entity.getData())
            .map((key) => (key === ExtendedValuesDefinition.COLUMN_ENTITY_TYPE ? false : key))
            .map((key) => (key === ExtendedValuesDefinition.COLUMN_ENTITY_ID ? false : key))
            .filter((key) => !!key)
            .map((key) =>
                new ExtendedValuesEntity()
                    .setEntityId(entity.getEntityId())
                    .setEntityType(entity.getEntityType())
                    .setValue(ExtendedValuesDefinition.COLUMN_VALUE_NAME, key)
                    .setValue(ExtendedValuesDefinition.COLUMN_VALUE_VALUE, entity.getValue(key))
            );
    }

    /**
     *
     * @param {ExtendedValuesEntity} entity
     * @return {Promise<void>}
     * @private
     */
    async _deleteEntities(entity) {
        const deleteEntities = await this._repository.fetchData(entity);
        for (let key in deleteEntities) {
            await this._em.delete(
                this._repository.getDefinition(),
                deleteEntities[key].getValue(ExtendedValuesDefinition.COLUMN_ID)
            );
        }
    }
}
