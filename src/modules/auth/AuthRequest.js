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
     * @return {Promise}
     * @public
     */
    createResponse(request) {
        return new Promise(result => {
            const ret = {
                status: true,
                error: '',
                token: '',
            };
            result({
                body: request.body
            });
            try {
                this._checkRequestMethod(request);
                const params = new AuthParamsFactory().create(request);
                const apiKey = new ApiKeyProvider(this.storageProvider).get();
                new AuthCheck(apiKey)
                    .check(params)
                    .then(res => {
                        ret.result = res;
                        ret.token = params.token;
                        result(ret);
                    })
                    .catch(e => {
                        ret.status = false;
                        ret.error = e.message;
                        result(ret);
                    });
            } catch (e) {
                ret.status = false;
                ret.error = e.message;
                result(ret);
            }
        });
    }

    /**
     *
     * @param request
     * @private
     */
    _checkRequestMethod(request) {
        if (request.method !== 'POST') {
            throw new Error('Bad request');
        }
    }
}