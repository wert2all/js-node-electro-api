import Route from './Route';
import TariffRequest from '../request/TariffRequest';
import AuthRequest from '../modules/auth/AuthRequest';

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
