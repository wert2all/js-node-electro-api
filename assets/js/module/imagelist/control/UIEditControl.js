import UIControlInterface from '../../../ui/control/UIControlInterface';

/**
 * @class UIEditControl
 * @extends UIControlInterface
 * @type UIControlInterface
 */
export default class UIEditControl extends UIControlInterface {
    /**
     *
     * @param {Node} modalElement
     * @param {UIkit} UIKit
     * @param {UIFormViewInterface} formView
     */
    constructor(modalElement, UIKit, formView) {
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
