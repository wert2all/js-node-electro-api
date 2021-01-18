import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class TableCreatorInterface
 */
export default class TableCreatorInterface {
    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @return {Promise<void>}

     */
    async createTable(definition) {
        throw new ImplementationError(this, "createTable");
    }
}
