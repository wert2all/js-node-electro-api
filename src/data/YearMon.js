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

    toString() {
        return this.date.getFullYear()
            + ((this.date.getMonth() < 10) ? '0' : '' + this.date.getMonth());
    }
}
