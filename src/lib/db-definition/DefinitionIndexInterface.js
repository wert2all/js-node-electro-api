import ImplementationError from "../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class DefinitionIndexInterface
 */
export default class DefinitionIndexInterface {
    /**
     * @abstract
     * @return {{unique: boolean, fields: string[]}}
     */
    toHash() {
        throw new ImplementationError(this, "toHash");
    }
}
