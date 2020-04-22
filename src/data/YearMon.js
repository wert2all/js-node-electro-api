/**
 * @class YearMon
 */
export default class YearMon {
    constructor() {
        /**
         *
         * @type {Date}
         */
        this.date = new Date();
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
}
