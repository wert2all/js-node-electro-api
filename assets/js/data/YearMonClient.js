export default class YearMonClient {
    /**
     *
     * @param {Date} date
     */
    constructor(date = null) {
        /**
         *
         * @type {Date}
         * @private
         */
        this._date = date !== null ? date : new Date();
    }

    /**
     *
     * @param {string} yearMonString
     * @return {YearMonClient|null}
     */
    static create(yearMonString) {
        const date = new Date();
        if (yearMonString.length === 6) {
            if (parseInt(yearMonString.substr(0, 4), 10) > 1970) {
                if (parseInt(yearMonString.substr(4, 2), 10) > 0
                    && parseInt(yearMonString.substr(4, 2), 10) <= 12
                ) {
                    date.setFullYear(
                        parseInt(yearMonString.substr(0, 4), 10),
                        parseInt(yearMonString.substr(4, 2), 10) - 1,
                        1
                    );
                    return new YearMonClient(date);
                }
            }
        }
        return null;
    }

    /**
     *
     * @return {Date}
     */
    getDate() {
        return this._date;
    }

    /**
     *
     * @return {string}
     */
    getYear() {
        return this._date.getFullYear().toString();
    }

    /**
     *
     * @return {string}
     */
    getMonth() {
        return (this._date.getMonth() + 1 < 10 ? '0' : '') + (this._date.getMonth() + 1);
    }
}
