const express = require("express");
const app = express();

function tariffDB() {
    const tariff = {
        201703: {
            one: {
                peak: {
                    price: 1.68,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.9}
                    ],
                }
            },
            two: {
                peak: {
                    price: 1.68,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.9}
                    ],
                },
                night: {
                    price: 1.68,
                    discount: 0.5,
                    ranges: [
                        {value: 100, price: 0.9}
                    ],
                }
            },
            three: {
                peak: {
                    price: 1.68,
                    discount: 1.5,
                    ranges: [
                        {value: 100, price: 0.9}
                    ],
                },
                halfpeak: {
                    price: 1.68,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.9}
                    ],
                },
                night: {
                    price: 1.68,
                    discount: .4,
                    ranges: [
                        {value: 100, price: 0.9}
                    ],
                }
            },
        },
        201609: {
            one: {
                peak: {
                    price: 1.638,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.714},
                        {value: 600, price: 1.29},
                    ],
                }
            },
            two: {
                peak: {
                    price: 1.638,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.714},
                        {value: 600, price: 1.29},
                    ],
                },
                night: {
                    price: 1.638,
                    discount: 0.5,
                    ranges: [
                        {value: 100, price: 0.714},
                        {value: 600, price: 1.29},
                    ],
                }
            },
            three: {
                peak: {
                    price: 1.638,
                    discount: 1.5,
                    ranges: [
                        {value: 100, price: 0.714},
                        {value: 600, price: 1.29},
                    ],
                },
                halfpeak: {
                    price: 1.638,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.714},
                        {value: 600, price: 1.29},
                    ],
                },
                night: {
                    price: 1.638,
                    discount: .4,
                    ranges: [
                        {value: 100, price: 0.714},
                        {value: 600, price: 1.29},
                    ],
                }
            },
        },
        201603: {
            one: {
                peak: {
                    price: 1.56,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.57},
                        {value: 600, price: 1.29},
                    ],
                }
            },
            two: {
                peak: {
                    price: 1.56,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.57},
                        {value: 600, price: .99},
                    ],
                },
                night: {
                    price: 1.56,
                    discount: 0.5,
                    ranges: [
                        {value: 100, price: 0.57},
                        {value: 600, price: .99},
                    ],
                }
            },
            three: {
                peak: {
                    price: 1.56,
                    discount: 1.5,
                    ranges: [
                        {value: 100, price: 0.57},
                        {value: 600, price: .99},
                    ],
                },
                halfpeak: {
                    price: 1.56,
                    discount: 1,
                    ranges: [
                        {value: 100, price: 0.57},
                        {value: 600, price: .99},
                    ],
                },
                night: {
                    price: 1.56,
                    discount: .4,
                    ranges: [
                        {value: 100, price: 0.57},
                        {value: 600, price: .99},
                    ],
                }
            },
        },
    };
    return {
        getKeys: () => Object.keys(tariff),
        get: key => tariff[key],
        getAll: () => tariff
    }
}

function tariffRepository(db) {
    const _less = (keys, yearmon) => keys
        .map(key => key <= yearmon ? key : false)
        .filter(item => !!item);

    function _max(lessKeys) {
        return Math.max(...lessKeys);
    }

    return {
        get: yearmon => {
            const keys = db.getKeys()
                .map(key => parseInt(key, 10));
            const lessKeys = _less(keys, yearmon);
            let maxKey = _max(lessKeys);
            let tariff = db.get(maxKey);
            if (!tariff) {
                maxKey = _max(keys)
            }
            tariff = db.get(maxKey);
            const ret = {};
            ret[maxKey] = tariff;
            return ret;
        },
        all: () => db.getAll()
    }
}

/**
 * @return {number}
 */
function YearMon(yearmon = "") {
    let date = new Date();
    if (yearmon.length === 6) {
        if (parseInt(yearmon.substr(0, 4), 10) > 1970) {
            if (parseInt(yearmon.substr(4, 2), 10) > 0
                && parseInt(yearmon.substr(4, 2), 10) <= 12
            ) {
                date.setFullYear(
                    parseInt(yearmon.substr(0, 4), 10),
                    parseInt(yearmon.substr(4, 2), 10),
                    1
                );
            }
        }
    }

    function _parseDate(date) {
        return "" + date.getFullYear()
            + ((date.getMonth() < 10) ? "0" : "")
            + date.getMonth()
    }

    return parseInt(_parseDate(date), 10)
}

/**
 *
 * @param  query
 * @returns {{yearmon: number, version: string}}
 * @constructor
 */
function RequestParams(query) {
    const params = {
        version: "1",
        yearmon: YearMon()
    };

    if (query.hasOwnProperty('version')) params.version = query.version;
    if (query.hasOwnProperty('yearmon')) params.yearmon = YearMon(query.yearmon);

    return {
        version: params.version,
        yearmon: params.yearmon
    }
}

function VersionFactory(version, tariffRepository) {
    const className = "Api_" + version;
    const latest = function (tariffRepository) {
        return {
            result: params => tariffRepository.get(params.yearmon),
            all: () => tariffRepository.all()
        }
    };
    const classes = {
        Api_1: latest,
        Api_latest: latest
    };
    return {
        create: () => {
            return classes.hasOwnProperty(className)
                ? new classes[className](tariffRepository)
                : new classes['Api_latest'](tariffRepository);
        }
    }
}

app.get("/", (req, res) => {
    const params = RequestParams(req.query);
    const api = VersionFactory(params.version, tariffRepository(tariffDB()))
        .create();

    res.json(
        (req.query.hasOwnProperty('all') && req.query.all === '1')
            ? api.all()
            : api.result(params)
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});