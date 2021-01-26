import DIFactory from "../../src/_init/factories/DIFactory";
import ConsoleConfigFactory from "../../src/_init/factories/ConsoleConfigFactory";
import AmqpConsumersProviderInterface from "../../src/lib/amqp/consumer/AmqpConsumersProviderInterface";

const di = DIFactory.create(ConsoleConfigFactory);
/**
 *
 * @type {AmqpConsumersProviderInterface}
 */
const amqpConsumersProvider = di.get(AmqpConsumersProviderInterface);
amqpConsumersProvider.getQueues().forEach((queue) => {
    amqpConsumersProvider
        .get(queue)
        .consume()
        .then(() => console.log(queue + ": consuming"))
        .catch(console.warn);
});
