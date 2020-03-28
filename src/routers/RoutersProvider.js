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
        this.routers = [
            new Route('/', new TariffRequest(storageProvider)),
            new Route('/auth/', new AuthRequest(storageProvider)),
        ];
    }

    fetch() {
        return this.routers;
    }
}
