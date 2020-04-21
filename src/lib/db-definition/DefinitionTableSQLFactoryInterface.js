import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class DefinitionTableSQLFactoryInterface
 */
export default class DefinitionTableSQLFactoryInterface {
    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @return string
     */
    createSQL(definition) {
        throw new ImplementationError(this, 'create');
    }
}
