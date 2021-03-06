import ImplementationError from "../../implementation-error/ImplementationError";
import DefinitionSQLBuilderInterface from "./DefinitionSQLBuilderInterface";

/**
 * @interface
 * @abstract
 * @extends DefinitionSQLBuilderInterface
 * @class DefinitionSQLSelectBuilderInterface
 */
export default class DefinitionSQLSelectBuilderInterface extends DefinitionSQLBuilderInterface {
    /**
     * @abstract
     * @param {DefinitionOrder} order
     * @return DefinitionSQLSelectBuilderInterface
     */
    // eslint-disable-next-line no-unused-vars
    applyOrder(order) {
        throw new ImplementationError(this, "applyOrder");
    }

    /**
     * @abstract
     * @param {Object<string, string>| null} fields
     * @return DefinitionSQLSelectBuilderInterface
     */
    // eslint-disable-next-line no-unused-vars
    applyFields(fields) {
        throw new ImplementationError(this, "applyFields");
    }

    /**
     * @abstract
     * @param {DefinitionLimit} limit
     * @return DefinitionSQLSelectBuilderInterface
     */
    // eslint-disable-next-line no-unused-vars
    applyLimit(limit) {
        throw new ImplementationError(this, "applyLimit");
    }
}
