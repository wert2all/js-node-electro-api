export default class TariffDB {
    constructor() {

        this.tariff = {
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
    }


    getKeys() {
        return Object.keys(this.tariff);
    }

    get(key) {
        return this.tariff[key];
    }

    getAll() {
        return this.tariff;
    }

}