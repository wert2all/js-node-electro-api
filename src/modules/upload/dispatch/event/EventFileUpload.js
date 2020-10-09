import EventInterface from "../../../../lib/dispatcher/EventInterface";

/**
 * @class EventFileUpload
 * @extends EventInterface
 * @type EventInterface
 */
export default class EventFileUpload extends EventInterface {
    static EVENT_NAME = "upload.file";

    /**
     *
     * @param {EntityInterface} file
     */
    constructor(file) {
        super();
        /**
         *
         * @type {EntityInterface}
         * @private
         */
        this._file = file;
    }

    getEventName() {
        return EventFileUpload.EVENT_NAME;
    }

    /**
     *
     * @return {EntityInterface}
     */
    getEventData() {
        return this._file;
    }
}
