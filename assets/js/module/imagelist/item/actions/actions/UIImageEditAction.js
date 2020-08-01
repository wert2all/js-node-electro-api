import UIImageActionInterface from '../UIImageActionInterface';

/**
 * @class UIImageEditAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageEditAction extends UIImageActionInterface {
    /**
     *
     * @param {Node} modalElement
     * @param {UIkit} UIKit
     */
    constructor(modalElement, UIKit,) {
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

    }

    /**
     *
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     */
    // eslint-disable-next-line no-unused-vars
    click(imageData, elementList = null) {
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
