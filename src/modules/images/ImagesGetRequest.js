import RequestInterface from '../../routers/request/RequestInterface';
import FilesRepository from '../../db/repository/FilesRepository';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import ResponseResult from '../../routers/response/ResponseResult';

/**
 * @class ImagesGetRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class ImagesGetRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {FilesRepository}
         * @private
         */
        this._repository = new FilesRepository();
    }

    /**
     *
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @return {ImagesGetRequest}
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
    async createResponse(request) {
        const response = new ResponseDataClass();

        return Promise.resolve(
            new ResponseResult(ResponseResult.TYPE_JSON, response.getData())
        );
    }
}
