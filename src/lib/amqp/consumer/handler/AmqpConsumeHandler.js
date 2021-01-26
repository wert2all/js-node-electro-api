import AmqpConsumeHandlerInterface from "./AmqpConsumeHandlerInterface";

/**
 * @class AmqpConsumeHandler
 * @extends AmqpConsumeHandlerInterface
 * @type AmqpConsumeHandlerInterface
 */

export default class AmqpConsumeHandler extends AmqpConsumeHandlerInterface {
    /**
     *
     * @param {AmqpConsumeProcessorInterface} processor
     * @param {AmqpMessageFactoryInterface} messageFactory
     */
    constructor(processor, messageFactory) {
        super();
        /**
         *
         * @type {AmqpConsumeProcessorInterface}
         * @private
         */
        this._processor = processor;
        /**
         *
         * @type {AmqpMessageFactoryInterface}
         * @private
         */
        this._messageFactory = messageFactory;
    }

    fire(channel, message) {
        this._processor
            .process(channel, this._messageFactory.fromMessage(message), message)
            .then(() => console.log("done"));
    }
}
