import UIAfterControlInterface from "../../../../ui/control/UIAfterControlInterface";

/**
 * @class AfterEditControl
 * @extends UIAfterControlInterface
 * @type UIAfterControlInterface
 */
export default class AfterEditControl extends UIAfterControlInterface {
    /**
     *
     * @param {UIElementListInterface} list
     */
    constructor(list) {
        super();
        /**
         *
         * @type {UIElementListInterface}
         * @private
         */
        this._list = list;
    }

    /**
     * @return {void}
     */
    exec() {
        this._list.refresh();
    }
}
