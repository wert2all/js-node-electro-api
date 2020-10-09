import RepositoryAbstract from "../../lib/db-repository/ReposytoryAbstract";
import FilterFactory from "../../lib/db-filter/FilterFactory";
import ExtendedValuesDefinition from "../definition/ExtendedValuesDefinition";

/**
 * @class ExtendedValuesRepository
 * @type RepositoryAbstract
 * @extends RepositoryAbstract
 */
export default class ExtendedValuesRepository extends RepositoryAbstract {
    constructor() {
        super();
        /**
         *
         * @type {DefinitionTableInterface}
         * @private
         */
        this._definition = new ExtendedValuesDefinition();
        /**
         *
         * @type {FilterFactoryInterface}
         * @private
         */
        this._filterFactoryObject = new FilterFactory(this.getDefinition());
    }

    /**
     *
     * @return {FilterFactoryInterface}
     * @private
     */
    _filterFactory() {
        return this._filterFactoryObject;
    }

    /**
     *
     * @return {DefinitionTableInterface}
     */
    getDefinition() {
        return this._definition;
    }
}
