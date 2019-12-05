/**
 * @class VersionFactory
 * @type VersionFactory
 */
import ApiDataVersion1 from './Api/ApiDataVersion1';

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
            Api_1: new ApiDataVersion1(tariffRepository),
            Api_latest: new ApiDataVersion1(tariffRepository)
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
