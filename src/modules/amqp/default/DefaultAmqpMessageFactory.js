import AmqpMessageFactoryInterface from "../../../lib/amqp/message/AmqpMessageFactoryInterface";
import AmqpMessageJsonAdapter from "../../../lib/amqp/message/adapter/AmqpMessageJsonAdapter";

/**
 * @class DefaultAmqpMessageFactory
 * @extends AmqpMessageFactoryInterface
 * @type AmqpMessageFactoryInterface
 */
export default class DefaultAmqpMessageFactory extends AmqpMessageFactoryInterface {
    /**
     *
     * @param {{}} object
     * @return {AmqpMessageInterface|null}
     * @throws Error
     */
    create(object) {
        return new AmqpMessageJsonAdapter(object);
    }

    /**
     *
     * @param message
     * @return {AmqpMessageInterface|null}
     */
    fromMessage(message) {
        try {
            return this.create(JSON.parse(message.content.toString()));
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
