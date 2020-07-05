import UIImageActionsInterface from './UIImageActionsInterface';

/**
 * @class UIImageActionsComposite
 * @extends UIImageActionsInterface
 * @type UIImageActionsInterface
 */
export default class UIImageActionsComposite extends UIImageActionsInterface {
    /**
     *
     * @param {UIImageActionsInterface[]} actions
     */
    constructor(actions) {
        super();
        /**
         *
         * @type {UIImageActionsInterface[]}
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
