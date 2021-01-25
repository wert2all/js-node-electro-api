import AmqpConsumersProvider from "../../lib/amqp/consumer/AmqpConsumersProvider";
import UploadAmqpProducer from "../../modules/upload/amqp/UploadAmqpProducer";
import AmqpInterface from "../../lib/amqp/AmqpInterface";
import FileAmqpMessageFactory from "../../modules/amqp/message/FileAmqpMessageFactory";
import UploadAddFileAmqpConsumerFactory from "../../modules/console/amqp/Upload/Add/UploadAddFileAmqpConsumerFactory";
import ChangeImageAmqpProducer from "../../modules/images/amqp/ChangeImageAmqpProducer";
import ChangeImageFileAmqpConsumerFactory from "../../modules/console/amqp/Image/Change/ChangeImageFileAmqpConsumerFactory";
import ImageResizeAmqpProducer from "../../modules/console/amqp/Image/Resize/ImageResizeAmqpProducer";
import ImageResizeAmqpConsumerFactory from "../../modules/console/amqp/Image/Resize/ImageResizeAmqpConsumerFactory";

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
                new UploadAddFileAmqpConsumerFactory(amqpBroker)
            )
            .register(
                new ChangeImageAmqpProducer(amqpBroker),
                new FileAmqpMessageFactory(),
                new ChangeImageFileAmqpConsumerFactory(amqpBroker)
            )
            .register(
                new ImageResizeAmqpProducer(amqpBroker),
                new FileAmqpMessageFactory(),
                new ImageResizeAmqpConsumerFactory(amqpBroker)
            );
    }
}
