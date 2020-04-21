import RequestInterface from '../../routers/request/RequestInterface';
import RequestParams from './request/RequestParams';
import VersionFactory from './VersionFactory';
import TariffRepository from './db/TariffRepository';
import TariffDB from './db/TariffDB';

/**
 * @class TariffRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class TariffRequest extends RequestInterface {
    /**
     *
     */
    constructor() {
        super();
    }

    /**
     * @request {*} request
     * @return {Promise}
     * @public
     */
    createResponse(request) {
        return new Promise((result) => {
            const params = new RequestParams(request.query);
            /**
             * @type {ApiDataInterface}
             */
            const api = new VersionFactory(
                params.getVersion(),
                new TariffRepository(new TariffDB())
            ).create();
            result((request.query.hasOwnProperty('all') && request.query.all === '1')
                ? api.all()
                : api.result(params));
        });
    }

    /**
     *
     * @param {StorageProvider} storageProvider
     * @return RequestInterface
     */
    // eslint-disable-next-line no-unused-vars
    init(storageProvider) {
        return this;
    }
}
