import ImplementationError from "../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class WriteConnectionInterface
 */
export default class WriteConnectionInterface {
    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<void>}
     */
    // eslint-disable-next-line no-unused-vars
    async update(definition, data) {
        throw new ImplementationError(this, "update");
    }

    /**
     * @abstract
     * @param {DispatchInterface} dispatcher
     */
    setDispatcher(dispatcher) {
        throw new ImplementationError(this, "setDispatcher");
    }

    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<string>}
     */
    // eslint-disable-next-line no-unused-vars
    async insert(definition, data) {
        throw new ImplementationError(this, "insert");
    }

    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @param {string} primaryValue
     * @return {Promise<void>}
     */
    // eslint-disable-next-line no-unused-vars
    async delete(definition, primaryValue) {
        throw new ImplementationError(this, "delete");
    }

    /**
     * @return {Promise<*|null>}
     * @abstract
     */
    getConnection() {
        throw new ImplementationError(this, "getConnection");
    }
}
