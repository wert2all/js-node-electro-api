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
     * @param {Node} modalElement
     * @param {UIkit} UIKit
     * @param {UIFormViewInterface} formView
     */
    constructor(imageElement, modalElement, UIKit, formView) {
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
            .setElement('edit_image_ready', 'true');

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
