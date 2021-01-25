import AmqpConsumersProvider from "../../lib/amqp/consumer/AmqpConsumersProvider";
import UploadAmqpProducer from "../../modules/upload/amqp/UploadAmqpProducer";
import AmqpInterface from "../../lib/amqp/AmqpInterface";
import FileAmqpMessageFactory from "../../modules/amqp/message/FileAmqpMessageFactory";
import ChangeImageAmqpProducer from "../../modules/images/amqp/ChangeImageAmqpProducer";
import ImageResizeAmqpProducer from "../../modules/console/amqp/Image/Resize/ImageResizeAmqpProducer";
import ChangeImageProcessor from "../../modules/console/amqp/Image/Change/ChangeImageProcessor";
import AmqpConsumerFactory from "../../lib/amqp/consumer/AmqpConsumerFactory";
import ImageResizeProcessor from "../../modules/console/amqp/Image/Resize/ImageResizeProcessor";
import UploadAddFileProcessor from "../../modules/console/amqp/Upload/Add/UploadAddFileProcessor";

/**
 * @class AMQPProviderFactory
 */
export default class AMQPProviderFactory {
    /**
     *
     * @param {DI} di
     * @return AmqpConsumersProviderInterface
     */
    create(di) {
        /**
         *
         * @type {AmqpInterface}
         */
        const amqpBroker = di.get(AmqpInterface);
        const amqpConsumerProvider = new AmqpConsumersProvider();
        return amqpConsumerProvider
            .register(
                new UploadAmqpProducer(amqpBroker),
                new FileAmqpMessageFactory(),
                new AmqpConsumerFactory(amqpBroker, new UploadAddFileProcessor(amqpBroker))
            )
            .register(
                new ChangeImageAmqpProducer(amqpBroker),
                new FileAmqpMessageFactory(),
                new AmqpConsumerFactory(amqpBroker, new ChangeImageProcessor(amqpBroker))
            )
            .register(
                new ImageResizeAmqpProducer(amqpBroker),
                new FileAmqpMessageFactory(),
                new AmqpConsumerFactory(amqpBroker, new ImageResizeProcessor(amqpBroker))
            );
    }
}
