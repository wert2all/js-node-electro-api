import UIImageActionInterface from '../UIImageActionInterface';

/**
 * @class UIImageDeleteAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageDeleteAction extends UIImageActionInterface {
    /**
     *
     * @param {UIConfirm} confirm
     * @param {Api} api
     * @param {AuthProviderInterface} authProvider
     * @param {UINotifyInterface} notify
     */
    constructor(confirm, api, authProvider, notify) {
        super();
        /**
         *
         * @type {UIConfirm}
         * @private
         */
        this._confirm = confirm;
        /**
         *
         * @type {Api}
         * @private
         */
        this._api = api;
        /**
         *
         * @type {AuthProviderInterface}
         * @private
         */
        this._authProvider = authProvider;
        /**
         *
         * @type {UINotifyInterface}
         * @private
         */
        this._notify = notify;
    }

    /**
     *
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     */
    click(imageData, elementList = null) {
        this._confirm.confirm('Delete image?')
            .then(() => this._api
                .deleteImage(this._authProvider.getUserProfile(), imageData)
            )
            .then(response => {
                if (response.getStatus() === true) {
                    this._notify.success('Deleted.');
                    elementList.refresh();
                } else {
                    this._notify.error(response.getErrorMessage());
                }
            })
            .catch(() => true);
    }
}
