import YearMon from "./YearMon";

/**
 * @class RequestParams
 */
export default class RequestParams {
    constructor(query) {
        this._params = {
            version: "1",
            yearmon: new YearMon().toInt(),
        };

        if (query.hasOwnProperty("version")) {
            this._params.version = query.version;
        }
        if (query.hasOwnProperty("yearmon")) {
            this._params.yearmon = new YearMon(query.yearmon).toInt();
        }
    }

    getVersion() {
        return this._params.version;
    }

    getYearMon() {
        return this._params.yearmon;
    }
}
