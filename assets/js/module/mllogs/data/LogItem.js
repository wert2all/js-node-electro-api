/**
 * @class LogItem
 */

export default class LogItem {
    /**
     *
     * @param {string} alias
     * @param {string} message
     * @param {string|null} status
     */
    constructor(alias, message = "", status = null) {
        /**
         *
         * @type {string}
         * @private
         */
        this._alias = alias;
        /**
         *
         * @type {string}
         * @private
         */
        this._message = message;
        /**
         *
         * @type {string}
         * @private
         */
        this._status = status === "1" ? "success" : "danger";
    }

    static create(oneLog) {
        if (oneLog.hasOwnProperty("ml_alias")) {
            const alias = oneLog.ml_alias;
            let message = "";
            let status = null;
            if (oneLog.hasOwnProperty("message")) {
                message = oneLog.message;
            }
            if (oneLog.hasOwnProperty("status")) {
                status = oneLog.status;
            }
            return new LogItem(alias, message, status);
        }
        return false;
    }

    /**
     *
     * @return {string}
     */
    getStatus() {
        return this._status;
    }

    /**
     *
     * @return {string}
     */
    getMessage() {
        return this._message;
    }

    /**
     *
     * @return {string}
     */
    getAlias() {
        return this._alias;
    }
}
