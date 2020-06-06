import ResponseProcessorJson from './proseccor/ResponseProcessorJson';
import ResponseResult from './ResponseResult';
import ResponseProcessorHtml from './proseccor/ResponseProcessorHtml';

/**
 * @class ResponseFactory
 */
export default class ResponseFactory {
    /**
     *
     * @param {ResponseResult} result
     * @return ResponseProcessorInterface
     */
    create(result) {
        switch (result.getResultType()) {
            case ResponseResult.TYPE_JSON: {
                return new ResponseProcessorJson(result);
            }
            case ResponseResult.TYPE_HTML: {
                return new ResponseProcessorHtml(result);
            }
            default:
                return new ResponseProcessorJson(result);
        }
    }
}
