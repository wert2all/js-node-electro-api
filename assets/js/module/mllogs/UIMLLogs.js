import UIElementListInterface from "../../ui/interfaces/element/UIElementListInterface";

/**
 * @class UIMLLogs
 * @extends UIElementListInterface
 * @type UIElementListInterface
 */
export default class UIMLLogs extends UIElementListInterface {
    /**
     *
     * @param {DomFormElementInterface} entityId
     * @param {Api} api
     */
    constructor(entityId, api) {
        super();
        /**
         *
         * @type {DomFormElementInterface}
         * @private
         */
        this._entityId = entityId;
        /**
         *
         * @type {Api}
         * @private
         */
        this._api = api;
    }

    init() {}

    refresh() {
        console.log(this._entityId.getValue());
    }
}
