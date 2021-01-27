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
import ImageRepository from "../../lib/console/gulp/image/default/ImageRepository";
import ReadConnectionInterface from "../../lib/db-connection/ReadConnectionInterface";
import ExtendedValuesEntityManager from "../../extended/ExtendedValuesEntityManager";
import EntityManager from "../../lib/db-entity-manager/EntityManager";
import ResizeImageFilterEntityFactory from "../../modules/console/resize/entity/ResizeImageFilterEntityFactory";
import ImageResultFactory from "../../lib/console/gulp/image/default/ImageResultFactory";
import ResizeProcessorFactory from "../../modules/console/resize/ResizeProcessorFactory";
import DefaultAmqpProducer from "../../modules/amqp/default/DefaultAmqpProducer";
import DefaultAmqpProcessor from "../../modules/amqp/default/DefaultAmqpProcessor";
import DefaultAmqpMessageFactory from "../../modules/amqp/default/DefaultAmqpMessageFactory";

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
                new AmqpConsumerFactory(
                    amqpBroker,
                    new ImageResizeProcessor(
                        amqpBroker,
                        new ImageRepository(
                            di.get(ReadConnectionInterface),
                            new ExtendedValuesEntityManager(di.get(EntityManager)),
                            new ResizeImageFilterEntityFactory()
                        ),
                        new ResizeProcessorFactory(),
                        new ImageResultFactory()
                    )
                )
            )
            .register(
                new DefaultAmqpProducer(amqpBroker, "amqp.image.resize.ok"),
                new DefaultAmqpMessageFactory(),
                new AmqpConsumerFactory(amqpBroker, new DefaultAmqpProcessor())
            );
    }
}
