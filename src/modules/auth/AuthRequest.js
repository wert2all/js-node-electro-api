import RequestInterface from '../../request/RequestInterface';
import AuthParamsFactory from './params/Factory';
import ApiKeyProvider from './key/KeyProvider';
import AuthCheck from './AuthCheck';

/**
 * @class AuthRequest
 * @type RequestInterface
 */
export default class AuthRequest extends RequestInterface {
    /**
     *
     * @param {StorageProvider} storageProvider
     */
    constructor(storageProvider) {
        super();
        /**
         *
         * @type {StorageProvider}
         */
        this.storageProvider = storageProvider;
    }

    /**
     * @request {*} request
     * @return {{}}
     * @public
     */
    createResponse(request) {
        const ret = {status: true};
        try {
            this._checkRequestMethod(request);
            const params = new AuthParamsFactory().create(request);
            const apiKey = new ApiKeyProvider(this.storageProvider).get();
            new AuthCheck(apiKey)
                .check(params);
        } catch (e) {
            ret.status = false;
            ret.error = e.message;
        }
        ret.dump = request.query;
        return ret;
    }

    /**
     *
     * @param request
     * @private
     */
    _checkRequestMethod(request) {
        //FIXME
        if (request.method === 'POST') {
            throw new Error('Bad request');
        }
    }
}
