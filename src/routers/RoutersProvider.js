import Route from './Route';
import TariffRequest from '../modules/tariff/TariffRequest';
import AuthRequest from '../modules/auth/AuthRequest';
import UploadRequest from '../modules/upload/UploadRequest';

/**
 * @class RoutersProvider
 * @type RoutersProvider
 */
export default class RoutersProvider {

    /**
     *
     * @param {StorageProvider} storageProvider
     */
    constructor(storageProvider) {
        /**
         *
         * @type {Route[]}
         */
        this.routers = [
            new Route('/', 'get', TariffRequest, storageProvider),
            new Route('/auth/', 'post', AuthRequest, storageProvider),
            new Route('/upload/', 'post', UploadRequest, storageProvider),
        ];
    }

    /**
     *
     * @return {Route[]}
     */
    fetch() {
        return this.routers;
    }
}
