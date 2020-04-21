import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class ConnectionInterface
 */
export default class ConnectionInterface {
    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @return {Promise<Array>}
     */
    async select(definition, filter) {
        throw new ImplementationError(this, 'select');
    }
}
