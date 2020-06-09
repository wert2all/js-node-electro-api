import ResponseProcessorInterface from '../ResponseProcessorInterface';
import RendererInterface from '../../../lib/renderer/RendererInterface';
import DI from '../../../lib/di/DI';

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
        /**
         *
         * @type {ResponseResult}
         * @private
         */
        this._result = result;
        /**
         *
         * @type {RendererInterface}
         * @private
         */
        this._renderer = DI.getInstance().get(RendererInterface);
    }

    /**
     *
     * @param response
     * @return {*}
     */
    send(response) {
        return response.send(
            this._renderer
                .setValues(this._result.getData())
                .render()
        );
    }
}
