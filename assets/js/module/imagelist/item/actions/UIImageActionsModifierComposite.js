import UIImageActionsModifierInterface from "./UIImageActionsModifierInterface";

/**
 * @class UIImageActionsModifierComposite
 * @extends UIImageActionsModifierInterface
 * @type UIImageActionsModifierInterface
 */
export default class UIImageActionsModifierComposite extends UIImageActionsModifierInterface {
    /**
     *
     * @param {UIImageActionsModifierInterface[]} actions
     */
    constructor(actions) {
        super();
        /**
         *
         * @type {UIImageActionsModifierInterface[]}
         * @private
         */
        this._actions = actions;
    }

    /**
     *
     * @param {ParentNode} node
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     */
    applyData(node, imageData, elementList = null) {
        this._actions.forEach((action) => action.applyData(node, imageData, elementList));
    }
}
