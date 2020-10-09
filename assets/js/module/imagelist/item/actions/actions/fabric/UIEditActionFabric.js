import UIImageActionModifier from "../../elements/UIImageActionModifier";
import DomListenersModifier from "../../../../../../dom/utils/DomListenersModifier";
import UIImageEditAction from "../UIImageEditAction";

/**
 * @class UIEditActionFabric
 */
export default class UIEditActionFabric {
    /**
     *
     * @param {UIEditControl} editControl
     * @param {AfterEditControlFabric} factory
     */
    constructor(editControl, factory) {
        /**
         *
         * @type {UIEditControl}
         * @private
         */
        this._editControl = editControl;
        /**
         *
         * @type {AfterEditControlFabric}
         * @private
         */
        this._factory = factory;
    }

    /**
     *
     * @param {string} selector
     * @return {UIImageActionModifier}
     */
    create(selector) {
        return new UIImageActionModifier(
            new DomListenersModifier(),
            selector,
            new UIImageEditAction(this._editControl, this._factory)
        );
    }
}
