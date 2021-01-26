import DIFactory from "../../src/_init/factories/DIFactory";
import ConsoleConfigFactory from "../../src/_init/factories/ConsoleConfigFactory";
import AmqpConsumersProviderInterface from "../../src/lib/amqp/consumer/AmqpConsumersProviderInterface";

const di = DIFactory.create(ConsoleConfigFactory);
/**
 *
 * @type {AmqpConsumersProviderInterface}
 */
const amqpConsumersProvider = di.get(AmqpConsumersProviderInterface);
Promise.all(
    amqpConsumersProvider.getQueues().map((queue) => {
        return amqpConsumersProvider.get(queue).consume();
    })
)
    .then((d) => {
        console.log(d);
        console.log("all done");
    })
    .catch(console.warn);
