import UploadAmqpMessage from "./UploadAmqpMessage";
import AmqpMessageFactoryInterface from "../../../lib/amqp/message/AmqpMessageFactoryInterface";

/**
 * @class UploadAmqpMessageFactory
 * @extends AmqpMessageFactoryInterface
 * @type AmqpMessageFactoryInterface
 */
export default class UploadAmqpMessageFactory extends AmqpMessageFactoryInterface {
    /**
     *
     * @param {{}} object
     * @return {AmqpMessageInterface|null}
     * @throws Error
     */
    create(object) {
        if (object.hasOwnProperty("entity_id")) {
            return new UploadAmqpMessage(object.entity_id);
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
