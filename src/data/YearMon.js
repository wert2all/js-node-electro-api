/**
 * @class YearMon
 */
export default class YearMon {
    /**
     *
     * @param {Date} date
     */
    constructor(date = null) {
        /**
         *
         * @type {Date}
         */
        this.date = date !== null ? date : new Date();
    }

    /**
     *
     * @return {string}
     */
    toString() {
        return this.getYear() + this.getMonth();
    }

    /**
     *
     * @return {string}
     */
    getYear() {
        return this.date.getFullYear().toString();
    }

    /**
     *
     * @return {string}
     */
    getMonth() {
        return (this.date.getMonth() + 1 < 10 ? '0' : '') + (this.date.getMonth() + 1);
    }

    /**
     *
     * @param {string} yearMonString
     * @return {null|YearMon}
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
                    return new YearMon(date);
                }
            }
        }
        return null;
    }
}
