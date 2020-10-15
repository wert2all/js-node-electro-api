import RequestDataInterface from "../../../routers/request/data/RequestDataInterface";

/**
 * @class MLLogsGetDataClass
 * @extends RequestDataInterface
 * @type RequestDataInterface
 */
export default class MLLogsGetDataClass extends RequestDataInterface {
    /**
     *
     * @param {string} token
     */
    constructor(token) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._token = token;
        /**
         *
         * @type {GoogleAccount|null}
         * @private
         */
        this._account = null;
        /**
         *
         * @type {null|string}
         * @private
         */
        this._entityId = null;
    }

    getEntityId() {
        return this._entityId;
    }

    /**
     *
     * @return {GoogleAccount|null}
     */
    getAccount() {
        return this._account;
    }

    /**
     *
     * @param {GoogleAccount} account
     * @return {MLLogsGetDataClass}
     */
    setGoogleAccount(account) {
        /**
         *
         * @type {string}
         * @private
         */
        this._account = account;
        return this;
    }

    /**
     *
     * @return {string}
     */
    getToken() {
        return this._token;
    }

    /**
     *
     * @param {string} entityId
     * @return {MLLogsGetDataClass}
     */
    setEntityId(entityId) {
        this._entityId = entityId;
        return this;
    }
}
