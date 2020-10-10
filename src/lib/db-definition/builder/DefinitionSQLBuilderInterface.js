import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class DefinitionSQLBuilderInterface
 */
export default class DefinitionSQLBuilderInterface {
    /**
     * @abstract
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return string
     */
    // eslint-disable-next-line no-unused-vars
    buildSQL(definition, data) {
        throw new ImplementationError(this, "create");
    }
}
