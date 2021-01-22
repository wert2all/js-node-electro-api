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
}
