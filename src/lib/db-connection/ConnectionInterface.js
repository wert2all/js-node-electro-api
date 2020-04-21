import ImplementationError from '../implementation-error/ImplementationError';

export default class ConnectionInterface {
    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @return {Promise<Array>}
     * @abstract
     */
    async select(definition, filter) {
        throw new ImplementationError(this, 'select');
    }
}
