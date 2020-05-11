import RepositoryAbstract from '../../lib/db-repository/ReposytoryAbstract';
import FilterFactory from '../../lib/db-filter/FilterFactory';
import UserProfileDefinition from '../definition/UserProfileDefinition';

/**
 * @class UserProfileRepository
 * @extends RepositoryAbstract
 * @type RepositoryAbstract
 */
export default class UserProfileRepository extends RepositoryAbstract {

    constructor() {
        super();
        /**
         *
         * @type {DefinitionTableInterface}
         * @private
         */
        this._definition = new UserProfileDefinition();
        /**
         *
         * @type {FilterFactoryInterface}
         * @private
         */
        this._filterFactoryObject = new FilterFactory(this.getDefinition());
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
