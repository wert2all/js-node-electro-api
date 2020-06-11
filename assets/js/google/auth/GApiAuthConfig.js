/**
 * @class GApiAuthConfig
 */
export default class GApiAuthConfig {
    /**
     *
     * @param {string} clientId
     * @param {string} scope
     */
    constructor(clientId, scope) {
        /**
         *
         * @type {string}
         * @private
         */
        this._clientId = clientId;
        /**
         *
         * @type {string}
         * @private
         */
        this._scope = scope;
    }

    /**
     *
     * @return {string}
     */
    getClientId() {
        return this._clientId;
    }

    /**
     *
     * @return {string}
     */
    getScope() {
        return this._scope;
    }
}
