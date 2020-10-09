import FilterFactoryInterface from "./FilterFactoryInterface";
import Filter from "./Filter";

/**
 * @class FilterFactory
 * @type FilterFactoryInterface
 * @extends FilterFactoryInterface
 */
export default class FilterFactory extends FilterFactoryInterface {
    /**
     *
     * @param {DefinitionTableInterface} definition
     */
    constructor(definition) {
        super();
        /**
         *
         * @type {DefinitionTableInterface}
         */
        this._definition = definition;
    }

    /**
     *
     * @param {EntityInterface} entity
     * @return FilterInterface
     */
    create(entity) {
        const entityData = entity.getData();
        const filter = new Filter();
        this._definition.getColumns().forEach((column) => {
            if (entityData.hasOwnProperty(column.getColumnName())) {
                filter.addColumn(column, entityData[column.getColumnName()]);
            }
        });
        return filter;
    }
}
