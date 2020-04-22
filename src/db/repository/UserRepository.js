import RepositoryAbstract from '../../lib/db-repository/ReposytoryAbstract';
import FilterFactory from '../../lib/db-filter/FilterFactory';
import UserDefinition from '../definition/UserDefinition';

/**
 * @class UserRepository
 * @type RepositoryAbstract
 * @extends RepositoryAbstract
 */
export default class UserRepository extends RepositoryAbstract {
    constructor() {
        super();
        /**
         *
         * @type {DefinitionTableInterface}
         * @private
         */
        this._definition = new UserDefinition();
        /**
         *
         * @type {FilterFactoryInterface}
         * @private
         */
        this._filterFactoryObject = new FilterFactory(this.getDefinition());
    }

    /**
     *
     * @param {EntityInterface} user
     * @return {Promise<EntityInterface[]>}
     */
    async fetchData(user) {
        return super.fetchData(user);
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
