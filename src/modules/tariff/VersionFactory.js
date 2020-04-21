/**
 * @class VersionFactory
 * @type VersionFactory
 */
import ApiDataVersion1 from './api/ApiDataVersion1';
import ApiDataVersion2 from './api/ApiDataVersion2';

export default class VersionFactory {

    /**
     *
     * @param {string} version
     * @param {TariffRepository} tariffRepository
     */
    constructor(version, tariffRepository) {
        /**
         *
         * @type {TariffRepository}
         */
        this.tariffRepository = tariffRepository;
        this.className = 'Api_' + version;

        this.classes = {
            // eslint-disable-next-line camelcase
            Api_1: ApiDataVersion1,
            // eslint-disable-next-line camelcase
            Api_2: ApiDataVersion2,
            // eslint-disable-next-line camelcase
            Api_latest: ApiDataVersion1
        };
    }

    /**
     *
     * @return {ApiDataInterface}
     */
    create() {
        return this.classes.hasOwnProperty(this.className)
            ? new this.classes[this.className](this.tariffRepository)
            : new this.classes['Api_latest'](this.tariffRepository);
    }

}
