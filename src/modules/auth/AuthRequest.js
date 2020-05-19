import RequestInterface from '../../routers/request/RequestInterface';
import AuthParamsFactory from './params/Factory';
import ApiKeyProvider from './key/KeyProvider';
import AuthCheck from './AuthCheck';

/**
 * @class AuthRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class AuthRequest extends RequestInterface {

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
            try {
                this._checkRequestMethod(request);
                const params = new AuthParamsFactory().create(request);
                const apiKey = new ApiKeyProvider(this.storageProvider).get();
                new AuthCheck(apiKey)
                    .check(params)
                    .then(res => {
                        ret.token = res.getGoogleUserId();
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

    /**
     *
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @return RequestInterface
     */
    // eslint-disable-next-line no-unused-vars
    init(storageProvider, dispatcher) {
        /**
         *
         * @type {StorageProvider}
         */
        this.storageProvider = storageProvider;
        return this;
    }
}
