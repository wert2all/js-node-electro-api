import Route from './Route';
import TariffRequest from '../request/TariffRequest';
import AuthRequest from '../request/AuthRequest';

/**
 * @class RoutersProvider
 * @type RoutersProvider
 */
export default class RoutersProvider {

    constructor() {
        this.routers = [
            new Route('/', new TariffRequest()),
            new Route('/auth/', new AuthRequest()),
        ];
    }

    fetch() {
        return this.routers;
    }
}
