import Route from './Route';
import TariffRequest from '../request/TariffRequest';

/**
 * @class RoutersProvider
 * @type RoutersProvider
 */
export default class RoutersProvider {

    constructor() {
        this.routers = [
            new Route('/', new TariffRequest())
        ];
    }

    fetch() {
        return this.routers;
    }
}
