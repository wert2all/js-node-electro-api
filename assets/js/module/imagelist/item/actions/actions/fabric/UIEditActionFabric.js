import UIImageActionModifier from '../../elements/UIImageActionModifier';
import DomListenersModifier from '../../../../../../dom/utils/DomListenersModifier';
import UIImageEditAction from '../UIImageEditAction';

/**
 * @class UIEditActionFabric
 */
export default class UIEditActionFabric {
    /**
     *
     * @param {Node} modalNode
     * @param {UIkit} uikit
     */
    constructor(modalNode, uikit) {
        /**
         *
         * @type {UIkit}
         * @private
         */
        this._uikit = uikit;
        /**
         *
         * @type {Node}
         * @private
         */
        this._modalNode = modalNode;
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
            new UIImageEditAction(this._modalNode, this._uikit)
        );
    }
}
