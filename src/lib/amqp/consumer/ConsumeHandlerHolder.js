/**
 * @class ConsumeHandlerHolder
 */
export default class ConsumeHandlerHolder {
    constructor(channel, msg) {
        this._channel = channel;
        this._msg = msg;
    }

    getMessage() {
        return this._msg;
    }

    getChannel() {
        return this._channel;
    }
}
