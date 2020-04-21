import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class DefinitionTableSQLFactoryInterface
 */
export default class DefinitionTableSQLFactoryInterface {
    /**
     * @abstract
     * @return string
     */
    create() {
        throw new ImplementationError(this, 'create');
    }
}
