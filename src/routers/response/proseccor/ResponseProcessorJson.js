import ResponseProcessorInterface from '../ResponseProcessorInterface';

/**
 * @class ResponseProcessorJson
 * @extends ResponseProcessorInterface
 * @type ResponseProcessorInterface
 */
export default class ResponseProcessorJson extends ResponseProcessorInterface {

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
        response.setHeader('Content-Type', 'application/json');
        return response.json(this._result);
    }
}
