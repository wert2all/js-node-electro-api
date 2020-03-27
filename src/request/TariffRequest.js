import RequestInterface from './RequestInterface';
import RequestParams from '../RequestParams';
import VersionFactory from '../VersionFactory';
import TariffRepository from '../db/TariffRepository';
import TariffDB from '../db/TariffDB';

/**
 * @class TariffRequest
 * @type RequestInterface
 */
export default class TariffRequest extends RequestInterface {
    /**
     * @request {*} request
     * @return {{}}
     * @public
     */
    createResponse(request) {
        const params = new RequestParams(request.query);
        /**
         * @type {ApiDataInterface}
         */
        const api = new VersionFactory(params.getVersion(), new TariffRepository(new TariffDB()))
            .create();

        return (request.query.hasOwnProperty('all') && request.query.all === '1')
            ? api.all()
            : api.result(params);
    }
}
