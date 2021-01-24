import AmqpMessageFactoryInterface from "../../../lib/amqp/message/AmqpMessageFactoryInterface";
import ChangeImageAmqpMessage from "./ChangeImageAmqpMessage";

/**
 * @class ChangeImageAmqpMessageFactory
 * @extends AmqpMessageFactoryInterface
 * @type AmqpMessageFactoryInterface
 */
export default class ChangeImageAmqpMessageFactory extends AmqpMessageFactoryInterface {
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

    /**
     *
     * @param {{}} object
     * @return {AmqpMessageInterface|null}
     * @throws Error
     */
    create(object) {
        if (object.hasOwnProperty("entity_id")) {
            return new ChangeImageAmqpMessage(object.entity_id);
        }
        return null;
    }
}
