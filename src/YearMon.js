/**
 * @class YearMon
 * @type YearMon
 */
export default class YearMon {
    constructor(yearMon = '') {
        this.date = new Date();
        if (yearMon.length === 6) {
            if (parseInt(yearMon.substr(0, 4), 10) > 1970) {
                if (parseInt(yearMon.substr(4, 2), 10) > 0
                    && parseInt(yearMon.substr(4, 2), 10) <= 12
                ) {
                    this.date.setFullYear(
                        parseInt(yearMon.substr(0, 4), 10),
                        parseInt(yearMon.substr(4, 2), 10),
                        1
                    );
                }
            }
        }
    }

    _parseDate(date) {
        return '' + date.getFullYear()
            + ((date.getMonth() < 10) ? '0' : '')
            + date.getMonth();
    }

    toInt() {
        return parseInt(this._parseDate(this.date), 10);
    }
}
