/**
 * @class TariffDB
 * @type TariffDB
 */
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
                },
                dormitories: {
                    one: {
                        full_peak: {
                            price: 0.9,
                            discount: 1,
                        }
                    },
                    two: {
                        full_peak: {
                            price: 0.9,
                            discount: 1
                        },
                        half_peak: {
                            price: 0.9,
                            discount: .05
                        }
                    },
                    three: {
                        full_peak: {
                            price: 0.9,
                            discount: 1.5,
                        },
                        half_peak: {
                            price: 0.9,
                            discount: 1,
                        },
                        low_peak: {
                            price: 0.9,
                            discount: 0.4,
                        }
                    }
                },
                many_children: {
                    one: {
                        full_peak: {
                            price: 0.9,
                            discount: 1,
                        }
                    },
                    two: {
                        full_peak: {
                            price: 0.9,
                            discount: 1
                        },
                        half_peak: {
                            price: 0.9,
                            discount: .05
                        }
                    },
                    three: {
                        full_peak: {
                            price: 0.9,
                            discount: 1.5,
                        },
                        half_peak: {
                            price: 0.9,
                            discount: 1,
                        },
                        low_peak: {
                            price: 0.9,
                            discount: 0.4,
                        }
                    }
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
                },
                dormitories: {
                    one: {
                        full_peak: {
                            price: 0.714,
                            discount: 1,
                        }
                    },
                    two: {
                        full_peak: {
                            price: 0.714,
                            discount: 1
                        },
                        half_peak: {
                            price: 0.714,
                            discount: .05
                        }
                    },
                    three: {
                        full_peak: {
                            price: 0.714,
                            discount: 1.5,
                        },
                        half_peak: {
                            price: 0.714,
                            discount: 1,
                        },
                        low_peak: {
                            price: 0.714,
                            discount: 0.4,
                        }
                    }
                },
                many_children: {
                    one: {
                        full_peak: {
                            price: 0.714,
                            discount: 1,
                        }
                    },
                    two: {
                        full_peak: {
                            price: 0.714,
                            discount: 1
                        },
                        half_peak: {
                            price: 0.714,
                            discount: .05
                        }
                    },
                    three: {
                        full_peak: {
                            price: 0.714,
                            discount: 1.5,
                        },
                        half_peak: {
                            price: 0.714,
                            discount: 1,
                        },
                        low_peak: {
                            price: 0.714,
                            discount: 0.4,
                        }
                    }
                },
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
                },
                dormitories: {
                    one: {
                        full_peak: {
                            price: 0.57,
                            discount: 1,
                        }
                    },
                    two: {
                        full_peak: {
                            price: 0.57,
                            discount: 1
                        },
                        half_peak: {
                            price: 0.57,
                            discount: .05
                        }
                    },
                    three: {
                        full_peak: {
                            price: 0.57,
                            discount: 1.5,
                        },
                        half_peak: {
                            price: 0.57,
                            discount: 1,
                        },
                        low_peak: {
                            price: 0.57,
                            discount: 0.4,
                        }
                    }
                },
                many_children: {
                    one: {
                        full_peak: {
                            price: 0.57,
                            discount: 1,
                        }
                    },
                    two: {
                        full_peak: {
                            price: 0.57,
                            discount: 1
                        },
                        half_peak: {
                            price: 0.57,
                            discount: .05
                        }
                    },
                    three: {
                        full_peak: {
                            price: 0.57,
                            discount: 1.5,
                        },
                        half_peak: {
                            price: 0.57,
                            discount: 1,
                        },
                        low_peak: {
                            price: 0.57,
                            discount: 0.4,
                        }
                    }
                },
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
