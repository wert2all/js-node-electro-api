import RepositoryAbstract from "../../../lib/db-repository/ReposytoryAbstract";
import FilterFactory from "../../../lib/db-filter/FilterFactory";
import MLModelTrainingDefinition from "../../definition/ml/MLModelTrainingDefinition";

/**
 * @class MLModelTrainingRepository
 * @extends RepositoryAbstract
 * @type RepositoryAbstract
 */
export default class MLModelTrainingRepository extends RepositoryAbstract {
    constructor() {
        super();
        /**
         *
         * @type {DefinitionTableInterface}
         * @private
         */
        this._definition = new MLModelTrainingDefinition();
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
