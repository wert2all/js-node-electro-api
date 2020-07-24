/**
 * @class UIConfirm
 */
export default class UIConfirm {
    /**
     *
     * @param UIkit
     */
    constructor(UIkit) {
        /**
         *
         * @private
         */
        this._uikit = UIkit;
    }

    /**
     *
     * @param {string} message
     * @return {Promise<void>}
     */
    confirm(message) {
        return this._uikit.modal.confirm(message);
    }
}
