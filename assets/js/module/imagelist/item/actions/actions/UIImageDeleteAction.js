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
     */
    constructor(confirm, api, authProvider) {
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
    }

    /**
     *
     * @param {ImageData} imageData
     */
    click(imageData) {
        this._confirm.confirm('Delete image?')
            .then(() => {
                const response = this._api
                    .deleteImage(this._authProvider.getUserProfile(), imageData);
                console.log(response);
            })
            .catch(() => true);
    }
}
