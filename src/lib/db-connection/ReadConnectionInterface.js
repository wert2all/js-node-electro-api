import ImplementationError from "../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class ReadConnectionInterface
 */
export default class ReadConnectionInterface {
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
        throw new ImplementationError(this, "select");
    }

    /**
     * @abstract
     * @param {DispatchInterface} dispatcher
     */
    setDispatcher(dispatcher) {
        throw new ImplementationError(this, "setDispatcher");
    }

    /**
     * @return {Promise<*|null>}
     * @abstract
     */
    getConnection() {
        throw new ImplementationError(this, "getConnection");
    }
}
