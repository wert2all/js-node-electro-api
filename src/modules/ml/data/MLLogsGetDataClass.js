import StringExt from "../../../lib/utils/StringExt";
import AuthNoToken from "../../auth/error/AuthNoToken";

/**
 * @class MLLogsGetDataClass
 */
export default class MLLogsGetDataClass {
    /**
     *
     * @param {string} token
     */
    constructor(token) {
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

    /**
     *
     * @param request
     * @return {MLLogsGetDataClass}
     */
    static factory(request) {
        let authToken = null;
        let returnRequest = null;
        if (request.query.token) {
            authToken = Buffer.from(new StringExt(request.query.token).replaceAll('"', ""), "base64").toString();
        }
        if (authToken !== null) {
            returnRequest = new MLLogsGetDataClass(authToken);
            if (request.query.entityid) {
                const entityId = parseInt(request.query.entityid, 10);
                returnRequest.setEntityId(entityId);
            }
        } else {
            throw new AuthNoToken();
        }

        return returnRequest;
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
