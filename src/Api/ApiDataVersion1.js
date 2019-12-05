import ApiDataInterface from './ApiDataInterface';

export default class ApiDataVersion1 extends ApiDataInterface {
    /**
     * @param {TariffRepository} tariffRepository
     */
    constructor(tariffRepository) {
        super();
        /**
         *
         * @type {TariffRepository}
         */
        this.tariffRepository = tariffRepository;
    }

    /**
     * @public
     */
    all() {
        return this.tariffRepository.all();
    }

    /**
     * @public
     * @param {RequestParams} params
     */
    result(params) {
        return this.tariffRepository
            .get(params.getYearMon())
            .data
            .map(item => item.location === 'city' ? item : false)
            .filter(item => !!item);
    }
}
