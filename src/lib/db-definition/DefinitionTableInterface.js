import ImplementationError from "../implementation-error/ImplementationError";

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
        throw new ImplementationError(this, "getColumns");
    }

    /**
     * @abstract
     * @return {string}
     */
    getTableName() {
        throw new ImplementationError(this, "getTableName");
    }

    /**
     * @abstract
     * @return {DefinitionColumnInterface}
     */
    getPrimaryColumn() {
        throw new ImplementationError(this, "getPrimaryColumn");
    }

    /**
     * @abstract
     * @param {string} key
     * @return {boolean}
     */
    // eslint-disable-next-line no-unused-vars
    isColumn(key) {
        throw new ImplementationError(this, "isColumn");
    }

    /**
     * @abstract
     * @return {DefinitionIndexInterface[]}
     */
    getIndexes() {
        throw new ImplementationError(this, "getIndexes");
    }
}
