import UIControlInterface from '../../../ui/control/UIControlInterface';

/**
 * @class UIEditControl
 * @extends UIControlInterface
 * @type UIControlInterface
 */
export default class UIEditControl extends UIControlInterface {
    /**
     *
     * @param {HTMLImageElement} imageElement
     * @param {HTMLElement} submitButton
     * @param {Node} modalElement
     * @param {UIkit} UIKit
     * @param {UIFormViewInterface} formView
     * @param {Api} api
     * @param {UINotifyInterface} notify
     * @param {AuthProviderInterface} authProvider
     */
    constructor(imageElement, submitButton, modalElement, UIKit, formView,
                api,
                notify,
                authProvider) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._modalElement = modalElement;
        /**
         *
         * @type {UIkit}
         * @private
         */
        this._uikit = UIKit;
        /**
         *
         * @type {UIFormViewInterface}
         * @private
         */
        this._formView = formView;
        /**
         *
         * @type {HTMLImageElement}
         * @private
         */
        this._image = imageElement;
        /**
         *
         * @type {HTMLElement}
         * @private
         */
        this._submitButton = submitButton;
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
        this._autProvider = authProvider;
        /**
         *
         * @type {UINotifyInterface}
         * @private
         */
        this._notify = notify;
    }

    /**
     *
     */
    clean() {
    }

    /**
     *
     */
    init() {
        this._submitButton.addEventListener('click', () => {
            if (this._formView.validate()) {
                this._formView.showLoader();
                // this._api.updateProfile(
                //     this._authProvider.getUserProfile(),
                //     {
                //         data: this._formView.getRequestFormData(),
                //         userId: this._formView.getFormData().get('profile_user_id')
                //     }
                // )
                //     .then(response => {
                //         this._formView.hideLoader();
                //         if (response.getStatus() === true) {
                //             this._notify.success('Saved!');
                //         } else {
                //             this._notify.error(response.getErrorMessage());
                //         }
                //     })
                //     .catch(error => {
                //         this._formView.hideLoader();
                //         this._notify.error(error.message);
                //     });
            }
        });
    }

    /**
     *
     * @param {ImageData} imageData
     */
    show(imageData) {
        console.log('edit');
        console.log(imageData);
        this._getModal().show();

        this._formView
            .setElement('edit_image_id', imageData.getId())
            .setElement('edit_image_path', imageData.getPath())
            .setElement('edit_image_type', imageData.getType())
            .setElement('edit_image_ready', 'false');

        this._image.src = imageData.getUrl();
    }

    /**
     *
     * @return {*}
     * @private
     */
    _getModal() {
        return this._uikit.modal(this._modalElement);
    }
}
