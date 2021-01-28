import AmqpConsumeProcessorInterface from "../../AmqpConsumeProcessorInterface";
import ImageManager from "../../../../../lib/console/gulp/image/default/ImageManager";

/**
 * @class ImageResizeProcessor
 * @extends AmqpConsumeProcessorInterface
 * @type AmqpConsumeProcessorInterface
 */
export default class ImageResizeProcessor extends AmqpConsumeProcessorInterface {
    /**
     *
     * @param {AmqpInterface} amqp
     * @param {ImageRepository} imageRepository
     * @param {ProcessorFactoryInterface} processorFactory
     * @param {ImageResultFactoryInterface} resultFactory
     * @param {AmqpSenderInterface} successProducer
     * @param {AmqpMessageFactoryInterface} successMessageFactory
     */
    constructor(amqp, imageRepository, processorFactory, resultFactory, successProducer, successMessageFactory) {
        super();
        /**
         *
         * @type {ProcessorFactoryInterface}
         * @private
         */
        this._processorFactory = processorFactory;
        /**
         *
         * @type {ImageRepository}
         * @private
         */
        this._imageRepository = imageRepository;
        /**
         *
         * @type {AmqpInterface}
         * @private
         */
        this._amqp = amqp;
        /**
         *
         * @type {ImageResultFactoryInterface}
         * @private
         */
        this._resultFactory = resultFactory;
        /**
         *
         * @type {AmqpSenderInterface}
         * @private
         */
        this._successProducer = successProducer;
        /**
         *
         * @type {AmqpMessageFactoryInterface}
         * @private
         */
        this._successMessageFactory = successMessageFactory;
    }

    /**
     * @return {Promise}
     * @param channel
     * @param {null|FileAmqpMessage} message
     * @param msgObj
     */
    process(channel, message, msgObj) {
        return new Promise((resolve, reject) => {
            this._imageRepository
                .getImage(message.getEntityId())
                .then((imageData) => new ImageManager(imageData, this._imageRepository.getExtendedEM()))
                .then((imageManager) => {
                    if (imageManager.canProcess()) {
                        return imageManager
                            .startProcess()
                            .then(() => {
                                /**
                                 *
                                 * @type {ImageResultInterface}
                                 */
                                const result = this._resultFactory.create();
                                const processor = this._processorFactory.create(imageManager.getData());
                                if (processor) {
                                    return processor
                                        .processImage(imageManager.getData(), result)
                                        .then(() => result)
                                        .catch((err) => {
                                            result.setError(err);
                                            return result;
                                        });
                                } else {
                                    return result;
                                }
                            })
                            .then((result) => imageManager.setResult(result))
                            .then(() => this._successProducer.send(this._successMessageFactory.create({})))
                            .then(() => imageManager.stopProcess());
                    }
                    return null;
                })
                .then(() => {
                    channel.ack(msgObj);
                    resolve();
                })
                .catch(reject);
        });
    }
}
