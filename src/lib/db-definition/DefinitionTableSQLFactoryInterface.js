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
    // eslint-disable-next-line no-unused-vars
    createSQL(definition) {
        throw new ImplementationError(this, 'create');
    }
}
