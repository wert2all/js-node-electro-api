import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class ConnectionInterface
 */
export default class ConnectionInterface {
    /**
     *
     * @param serverConnection
     */
    // eslint-disable-next-line no-unused-vars
    setServer(serverConnection) {
        throw new ImplementationError(this, 'setServer');
    }

    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @param {DefinitionOrder | null} order
     * @param {DefinitionLimit | null} limit
     * @param {null| Object<string, string>} fields
     * @return {Promise<Array>}
     */
    // eslint-disable-next-line no-unused-vars
    async select(definition, filter, order = null, limit = null, fields = null) {
        throw new ImplementationError(this, 'select');
    }

    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<void>}
     */
    // eslint-disable-next-line no-unused-vars
    async update(definition, data) {
        throw new ImplementationError(this, 'update');
    }

    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<string>}
     */
    // eslint-disable-next-line no-unused-vars
    async insert(definition, data) {
        throw new ImplementationError(this, 'insert');
    }
}
