import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @class DefinitionTableInterface
 * @interface
 * @abstract
 */
export default class DefinitionTableInterface {
    /**
     * @abstract
     * @return {DefinitionColumnInterface[]}
     */
    getColumns() {
        throw new ImplementationError(this, 'getColumns');
    }
}
