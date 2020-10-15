import ImplementationError from "../../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @class RequestDataInterface
 */
export default class RequestDataInterface {
    /**
     * @abstract
     * @param {GoogleAccount} account
     * @return RequestDataInterface
     */
    setGoogleAccount(account) {
        throw new ImplementationError(this, "setGoogleAccount");
    }

    /**
     * @abstract
     * @return {string}
     */
    getToken() {
        throw new ImplementationError(this, "getToken");
    }

    /**
     * @abstract
     * @return GoogleAccount
     */
    getAccount() {
        throw new ImplementationError(this, "getAccount");
    }
}
