/**
 * @class VersionFactory
 * @type VersionFactory
 */
import ApiDataVersion1 from './Api/ApiDataVersion1';
import ApiDataVersion2 from './Api/ApiDataVersion2';

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
            Api_1: ApiDataVersion1,
            Api_2: ApiDataVersion2,
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
