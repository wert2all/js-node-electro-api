import RequestInterface from '../../routers/request/RequestInterface';
import DataValue from '../../lib/data-value/DataValue';
import ResponseResult from '../../routers/response/ResponseResult';

/**
 * @class UIRequest
 * @externs RequestInterface
 * @type RequestInterface
 */
export default class UIRequest extends RequestInterface {
    /**
     *
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @return {UIRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(storageProvider, dispatcher) {
        /**
         *
         * @type {StorageProvider}
         * @private
         */
        this._storageProvider = storageProvider;
        return this;
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    createResponse(request) {
        return Promise.resolve(
            new ResponseResult(ResponseResult.TYPE_HTML, new DataValue())
        );
    }
}
