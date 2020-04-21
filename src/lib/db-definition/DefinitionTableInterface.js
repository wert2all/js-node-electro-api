import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class DefinitionTableInterface
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
