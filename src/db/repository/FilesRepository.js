/**
 * @class FilesRepository
 *
 */
import RepositoryAbstract from '../../lib/db-repository/ReposytoryAbstract';
import FilterFactory from '../../lib/db-filter/FilterFactory';

export default class FilesRepository extends RepositoryAbstract {

    /**
     *
     * @param {ConnectionInterface} connection
     */
    constructor(connection) {
        super(connection);
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

}
