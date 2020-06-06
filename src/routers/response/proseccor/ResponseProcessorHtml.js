import ResponseProcessorInterface from '../ResponseProcessorInterface';

/**
 * @class ResponseProcessorHtml
 * @extends ResponseProcessorInterface
 * @type ResponseProcessorInterface
 */
export default class ResponseProcessorHtml extends ResponseProcessorInterface {
    /**
     *
     * @param {ResponseResult} result
     */
    constructor(result) {
        super();
        this._result = result;
    }

    /**
     *
     * @param response
     * @return {*}
     */
    send(response) {
        return response.send(this._result.getData().toHash());
    }
}
