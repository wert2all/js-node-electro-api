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
        this._filterFactoryObject = new FilterFactory(this._getDefinition());
    }

    /**
     *
     * @param {EntityInterface} userFilesEntity
     * @return {Promise<EntityInterface[]>}
     */
    async fetchData(userFilesEntity) {
        return super.fetchData(userFilesEntity);
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
    _getDefinition() {
        return this._definition;
    }
}
