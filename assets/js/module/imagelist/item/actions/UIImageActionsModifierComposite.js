import UIImageActionsModifierInterface from './UIImageActionsModifierInterface';

/**
 * @class UIImageActionsModifierComposite
 * @extends UIImageActionsModifierInterface
 * @type UIImageActionsModifierInterface
 */
export default class UIImageActionsModifierComposite
    extends UIImageActionsModifierInterface {
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
     * @param {ImageData} imageData
     */
    applyData(imageData) {
        this._actions.forEach(action => action.applyData(imageData));
    }
}
