import AmqpMessageInterface from "../AmqpMessageInterface";

/**
 * @class AmqpMessageJsonAdapter
 * @type AmqpMessageInterface
 * @extends AmqpMessageInterface
 */
export default class AmqpMessageJsonAdapter extends AmqpMessageInterface {
    /**
     *
     * @param {{}} object
     */
    constructor(object) {
        super();
        /**
         *
         * @type {{}}
         * @private
         */
        this._object = object;
    }

    /**
     *
     * @return {string}
     */
    toString() {
        return JSON.stringify(this._object);
    }
}
