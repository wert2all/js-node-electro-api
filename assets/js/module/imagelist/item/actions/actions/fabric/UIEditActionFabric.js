import UIImageActionModifier from '../../elements/UIImageActionModifier';
import DomListenersModifier from '../../../../../../dom/utils/DomListenersModifier';
import UIImageEditAction from '../UIImageEditAction';

/**
 * @class UIEditActionFabric
 */
export default class UIEditActionFabric {
    /**
     *
     * @param {UIEditControl} editControl
     */
    constructor(editControl) {
        /**
         *
         * @type {UIEditControl}
         * @private
         */
        this._editControl = editControl;
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
            new UIImageEditAction(this._editControl)
        );
    }
}
