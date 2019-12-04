import VersionFactory from './src/VersionFactory';
import express from 'express';

import RequestParams from './src/RequestParams';
import TariffDB from './src/db/TariffDB';

const app = express();

function tariffRepository(db) {
    const _less = (keys, yearmon) => keys
        .map(key => key <= yearmon ? key : false)
        .filter(item => !!item);

    function _max(lessKeys) {
        return Math.max(...lessKeys);
    }

    function _transform(yearmon, tariff) {
        const ret = [];
        Object.keys(tariff)
            .map(location => {
                Object.keys(tariff[location])
                    .map(zone => {
                        Object.keys(tariff[location][zone])
                            .map(peak => {
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

    return {
        get: yearmon => {
            const keys = db.getKeys()
                .map(key => parseInt(key, 10));
            const lessKeys = _less(keys, yearmon);
            let maxKey = _max(lessKeys);
            let tariff = db.get(maxKey);
            if (!tariff) {
                maxKey = _max(keys);
            }
            tariff = _transform(yearmon, db.get(maxKey));
            return {data: tariff};
        },
        all: () => db.getAll()
    };
}

app.get('/', (req, res) => {
    const params = new RequestParams(req.query);
    const api = new VersionFactory(params.getVersion(), tariffRepository(new TariffDB()))
        .create();

    res.setHeader('Content-Type', 'application/json');
    res.json(
        (req.query.hasOwnProperty('all') && req.query.all === '1')
            ? api.all()
            : api.result(params)
    );
});

app.listen(3000, () => console.log('Server running on port 3000'));
