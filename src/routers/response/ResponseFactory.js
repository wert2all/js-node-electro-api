import ResponseProcessorJson from './proseccor/ResponseProcessorJson';
import ResponseResult from './ResponseResult';

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
            default:
                return new ResponseProcessorJson(result);
        }
    }
}
