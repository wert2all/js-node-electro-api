import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class TablesFactoryInterface
 */
export default class TablesFactoryInterface {
    /**
     * @abstract
     * @return {Promise<void>}
     */
    async create() {
        throw ImplementationError(this, "create");
    }

    /**
     * @abstract
     * @param {*} serverConnection
     * @return {TablesFactoryInterface}
     */
    setServer(serverConnection) {
        throw new ImplementationError(this, "setServer");
    }
}
