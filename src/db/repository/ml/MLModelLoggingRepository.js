import RepositoryAbstract from "../../../lib/db-repository/ReposytoryAbstract";
import FilterFactory from "../../../lib/db-filter/FilterFactory";
import MLModelLoggingDefinition from "../../definition/ml/MLModelLoggingDefinition";

/**
 * @class MLModelLoggingRepository
 * @extends RepositoryAbstract
 * @type RepositoryAbstract
 */
export default class MLModelLoggingRepository extends RepositoryAbstract {
    constructor() {
        super();
        /**
         *
         * @type {DefinitionTableInterface}
         * @private
         */
        this._definition = new MLModelLoggingDefinition();
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
