import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class DefinitionForeignKeyInterface
 */
export default class DefinitionForeignKeyInterface {
    /**
     * @abstract
     * @return {string[]}
     */
    getFields() {
        throw new ImplementationError(this, "getFields");
    }

    /**
     * @abstract
     * @return {string[]}
     */
    getMainFields() {
        throw new ImplementationError(this, "getMainFields");
    }

    /**
     * @abstract
     * @return {DefinitionTableInterface}
     */
    getTable() {
        throw new ImplementationError(this, "getTable");
    }

    /**
     * @abstract
     * @return {{action: string, actionName: string}[]}
     */
    getActions() {
        throw new ImplementationError(this, "getActions");
    }
}
