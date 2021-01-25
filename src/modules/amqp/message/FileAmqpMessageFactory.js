import FileAmqpMessage from "./FileAmqpMessage";
import AmqpMessageFactoryInterface from "../../../lib/amqp/message/AmqpMessageFactoryInterface";

/**
 * @class FileAmqpMessageFactory
 * @extends AmqpMessageFactoryInterface
 * @type AmqpMessageFactoryInterface
 */
export default class FileAmqpMessageFactory extends AmqpMessageFactoryInterface {
    /**
     *
     * @param {{}} object
     * @return {AmqpMessageInterface|null}
     * @throws Error
     */
    create(object) {
        if (object.hasOwnProperty("entity_id")) {
            return new FileAmqpMessage(object.entity_id);
        }
        return null;
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
