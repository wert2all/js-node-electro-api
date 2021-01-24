import EventInterface from "../../../../lib/dispatcher/EventInterface";

/**
 * @class EventImageChange
 * @extends EventInterface
 * @type EventInterface
 */
export default class EventImageChange extends EventInterface {
    static EVENT_NAME = "image.change";

    /**
     *
     * @param {UserFilesEntity} imageData
     */
    constructor(imageData) {
        super();
        /**
         *
         * @type {UserFilesEntity}
         * @private
         */
        this._imageData = imageData;
    }

    /**
     *
     * @return {string}
     */
    getEventName() {
        return EventImageChange.EVENT_NAME;
    }

    /**
     *
     * @return {EntityInterface}
     */
    getEventData() {
        return this._imageData;
    }
}
