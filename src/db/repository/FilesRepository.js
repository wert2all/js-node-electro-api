import RepositoryAbstract from '../../lib/db-repository/ReposytoryAbstract';
import FilterFactory from '../../lib/db-filter/FilterFactory';
import UserFilesDefinition from '../definition/UserFilesDefinition';

/**
 * @class FilesRepository
 * @extends RepositoryAbstract
 * @type RepositoryAbstract
 */
export default class FilesRepository extends RepositoryAbstract {

    /**
     *
     */
    constructor() {
        super();
        /**
         *
         * @type {DefinitionTableInterface}
         * @private
         */
        this._definition = new UserFilesDefinition();
        /**
         *
         * @type {FilterFactoryInterface}
         * @private
         */
        this._filterFactoryObject = new FilterFactory(this.getDefinition());
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
        return super.fetchData(entity, order, limit, fields);
    }

    /**
     * @protected
     * @return FilterFactoryInterface
     */
    _filterFactory() {
        return this._filterFactoryObject;
    }

    /**
     *
     * @protected
     * @return DefinitionTableInterface
     */
    getDefinition() {
        return this._definition;
    }
}
