/**
 * @class FilesRepository
 *
 */
import RepositoryAbstract from '../../lib/db-repository/ReposytoryAbstract';
import FilterFactory from '../../lib/db-filter/FilterFactory';
import UserFilesDefinition from '../definition/UserFilesDefinition';

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
     * @param {EntityInterface} userFilesEntity
     * @param {DefinitionOrder | null} order
     * @param {DefinitionLimit | null} limit
     * @return {Promise<EntityInterface[]>}
     */
    async fetchData(userFilesEntity, order = null, limit = null) {
        return super.fetchData(userFilesEntity, order, limit);
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
