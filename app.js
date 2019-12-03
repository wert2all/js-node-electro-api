import VersionFactory from './src/VersionFactory';
import express from 'express';

import RequestParams from './src/RequestParams';

const app = express();

function tariffDB() {
    const tariff = {
        201703: {
            city: {
                one: {
                    full_peak: {
                        price: 1.68,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.9}
                        ],
                    }
                },
                two: {
                    full_peak: {
                        price: 1.68,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.9}
                        ],
                    },
                    half_peak: {
                        price: 1.68,
                        discount: 0.5,
                        ranges: [
                            {value: 100, price: 0.9}
                        ],
                    }
                },
                three: {
                    full_peak: {
                        price: 1.68,
                        discount: 1.5,
                        ranges: [
                            {value: 100, price: 0.9}
                        ],
                    },
                    half_peak: {
                        price: 1.68,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.9}
                        ],
                    },
                    low_peak: {
                        price: 1.68,
                        discount: .4,
                        ranges: [
                            {value: 100, price: 0.9}
                        ],
                    }
                },
            }
        },
        201609: {
            city: {
                one: {
                    full_peak: {
                        price: 1.638,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.714},
                            {value: 600, price: 1.29},
                        ],
                    }
                },
                two: {
                    full_peak: {
                        price: 1.638,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.714},
                            {value: 600, price: 1.29},
                        ],
                    },
                    half_peak: {
                        price: 1.638,
                        discount: 0.5,
                        ranges: [
                            {value: 100, price: 0.714},
                            {value: 600, price: 1.29},
                        ],
                    }
                },
                three: {
                    full_peak: {
                        price: 1.638,
                        discount: 1.5,
                        ranges: [
                            {value: 100, price: 0.714},
                            {value: 600, price: 1.29},
                        ],
                    },
                    half_peak: {
                        price: 1.638,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.714},
                            {value: 600, price: 1.29},
                        ],
                    },
                    low_peak: {
                        price: 1.638,
                        discount: .4,
                        ranges: [
                            {value: 100, price: 0.714},
                            {value: 600, price: 1.29},
                        ],
                    }
                },
            }
        },
        201603: {
            city: {
                one: {
                    full_peak: {
                        price: 1.56,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.57},
                            {value: 600, price: 1.29},
                        ],
                    }
                },
                two: {
                    full_peak: {
                        price: 1.56,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.57},
                            {value: 600, price: .99},
                        ],
                    },
                    half_peak: {
                        price: 1.56,
                        discount: 0.5,
                        ranges: [
                            {value: 100, price: 0.57},
                            {value: 600, price: .99},
                        ],
                    }
                },
                three: {
                    full_peak: {
                        price: 1.56,
                        discount: 1.5,
                        ranges: [
                            {value: 100, price: 0.57},
                            {value: 600, price: .99},
                        ],
                    },
                    half_peak: {
                        price: 1.56,
                        discount: 1,
                        ranges: [
                            {value: 100, price: 0.57},
                            {value: 600, price: .99},
                        ],
                    },
                    low_peak: {
                        price: 1.56,
                        discount: .4,
                        ranges: [
                            {value: 100, price: 0.57},
                            {value: 600, price: .99},
                        ],
                    }
                },
            }
        },
    };
    return {
        getKeys: () => Object.keys(tariff),
        get: key => tariff[key],
        getAll: () => tariff
    };
}

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
    const api = new VersionFactory(params.getVersion(), tariffRepository(tariffDB()))
        .create();

    res.setHeader('Content-Type', 'application/json');
    res.json(
        (req.query.hasOwnProperty('all') && req.query.all === '1')
            ? api.all()
            : api.result(params)
    );
});

app.listen(3000, () => console.log('Server running on port 3000'));
