import ResponseProcessorJson from './proseccor/ResponseProcessorJson';

/**
 * @class ResponseFactory
 */
export default class ResponseFactory {
    /**
     *
     * @param result
     * @return ResponseProcessorInterface
     */
    create(result) {
        //TODO
        return new ResponseProcessorJson(result);
    }
}
