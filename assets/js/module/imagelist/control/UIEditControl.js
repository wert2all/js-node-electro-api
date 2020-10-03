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
     * @param {CropperFactory} cropperFactory
     */
    constructor(imageElement, submitButton, modalElement, UIKit, formView,
                api,
                notify,
                authProvider,
                cropperFactory) {
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
        this._authProvider = authProvider;
        /**
         *
         * @type {UINotifyInterface}
         * @private
         */
        this._notify = notify;
        /**
         *
         * @type {UIAfterControlInterface|null}
         * @private
         */
        this._afterControl = null;
        /**
         *
         * @type {CropperFactory}
         * @private
         */
        this._cropperFactory = cropperFactory;
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
                this._api.updateImage(
                    this._authProvider.getUserProfile(),
                    this._formView.getRequestFormData()
                )
                    .then(response => {
                        this._formView.hideLoader();
                        if (response.getStatus() === true) {
                            this._notify.success('Saved!');
                            if (this._afterControl != null) {
                                this._afterControl.exec();
                            }
                        } else {
                            this._notify.error(response.getErrorMessage());
                        }
                    })
                    .catch(error => {
                        this._formView.hideLoader();
                        this._notify.error(error.message);
                    });
            }
        });
    }

    /**
     *
     * @param {ImageData} imageData
     */
    show(imageData) {
        console.log(imageData);
        this._getModal().show();

        this._formView
            .setElement('edit_image_id', imageData.getId())
            .setElement('edit_image_path', imageData.getPath())
            .setElement('edit_image_type', imageData.getType())
            .setElement('edit_image_ready', imageData.getIsReady() ? 'true' : 'false')
            .setElement('edit_image_rotation', imageData.getRotation());

        this._image.src = imageData.getUrl();
        this._cropperFactory
            .create(this._image)
            .then(() => {
            });
    }

    /**
     *
     * @return {*}
     * @private
     */
    _getModal() {
        return this._uikit.modal(this._modalElement);
    }

    /**
     *
     * @param {UIAfterControlInterface} action
     */
    setAfterControlAction(action) {
        this._afterControl = action;
    }
}
