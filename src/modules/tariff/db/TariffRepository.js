/**
 * @class TariffRepository
 * @type TariffRepository
 */
export default class TariffRepository {
    /**
     *
     * @param {TariffDB} db
     */
    constructor(db) {
        /**
         *
         * @type {TariffDB}
         */
        this.db = db;
    }

    _less(keys, yearmon) {
        return keys.map((key) => (key <= yearmon ? key : false)).filter((item) => !!item);
    }

    _max(lessKeys) {
        return Math.max(...lessKeys);
    }

    _transform(yearmon, tariff) {
        const ret = [];
        Object.keys(tariff).map((location) => {
            Object.keys(tariff[location]).map((zone) => {
                Object.keys(tariff[location][zone]).map((peak) => {
                    const value = tariff[location][zone][peak];
                    value.zone = zone;
                    value.peak = peak;
                    value.yearmon = yearmon;
                    value.location = location;
                    ret.push(value);
                });
            });
        });
        return ret;
    }

    get(yearmon) {
        const keys = this.db.getKeys().map((key) => parseInt(key, 10));
        const lessKeys = this._less(keys, yearmon);
        let maxKey = this._max(lessKeys);
        let tariff = this.db.get(maxKey);
        if (!tariff) {
            maxKey = this._max(keys);
        }
        tariff = this._transform(yearmon, this.db.get(maxKey));
        return { data: tariff };
    }

    all() {
        return this.db.getAll();
    }
}
