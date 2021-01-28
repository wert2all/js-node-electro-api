import AmqpInterface from "../AmqpInterface";
import amqp from "amqplib";

/**
 * @class AmqplibAdapter
 * @extends AmqpInterface
 * @type AmqpInterface
 */
export default class AmqplibAdapter extends AmqpInterface {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        super();
        /**
         * @type {string}
         * @private
         */
        this._url = url;
        /**
         *
         * @private
         */
        this._channel = null;
    }

    /**
     *
     * @param {string} queueName
     * @param {AmqpMessageInterface} message
     * @return {Promise<boolean>}
     */
    sendMessage(queueName, message) {
        return new Promise((resolve, reject) => {
            this._getChannel()
                .then((channel) => this._sendMessage(channel, queueName, message))
                .then(() => resolve(true))
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    /**
     *
     * @param {*} channel
     * @param {string} queueName
     * @param {AmqpMessageInterface} message
     * @return {Promise}
     * @private
     */
    _sendMessage(channel, queueName, message) {
        return new Promise((resolve, reject) => {
            channel
                .assertQueue(queueName)
                .then(() => channel.sendToQueue(queueName, Buffer.from(message.toString())))
                .then((sendResult) => resolve(sendResult))
                .catch(reject);
        });
    }

    /**
     *
     * @return {Promise}
     * @private
     */
    _getChannel() {
        return new Promise((resolve, reject) => {
            if (this._channel !== null) {
                resolve(this._channel);
            } else {
                amqp.connect(this._url)
                    .then((connection) => connection.createChannel())
                    .then((channel) => {
                        this._channel = channel;
                        resolve(this._channel);
                    })
                    .catch((err) => reject(err));
            }
        });
    }

    /**
     *
     * @param {string} queueName
     * @param {AmqpConsumeHandlerInterface} handle
     * @return {Promise<void>}
     */
    consume(queueName, handle) {
        return this._getChannel().then((channel) => {
            return channel.assertQueue(queueName).then(() =>
                channel.consume(queueName, (msg) => {
                    handle.fire(channel, msg);
                })
            );
        });
    }
}
