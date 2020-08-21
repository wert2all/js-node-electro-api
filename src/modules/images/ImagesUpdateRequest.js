import RequestInterface from '../../routers/request/RequestInterface';
import ResponseResult from '../../routers/response/ResponseResult';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import DI from '../../lib/di/DI';
import LoggerInterface from '../../lib/logger/LoggerInterface';
import ImageListLogEvent from './logs/event/ImageListLogEvent';

/**
 * @class ImagesUpdateRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class ImagesUpdateRequest extends RequestInterface {
    constructor() {
        super();
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {ImagesUpdateRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        return this;
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    createResponse(request) {
        const response = new ResponseDataClass();
        try {
            response.setStatus(true);
        } catch (e) {
            DI.getInstance()
                .get(LoggerInterface)
                .error(new ImageListLogEvent(e.message));
            response.setStatus(false);
            response.setMessage(e.message);
        }
        return Promise.resolve(
            new ResponseResult(ResponseResult.TYPE_JSON, response.getData())
        );
    }
}
