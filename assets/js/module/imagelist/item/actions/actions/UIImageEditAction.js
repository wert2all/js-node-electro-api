import UIImageActionInterface from '../UIImageActionInterface';

/**
 * @class UIImageEditAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageEditAction extends UIImageActionInterface {
    /**
     *
     * @param {UIEditControl} editControl
     */
    constructor(editControl) {
        super();
        /**
         *
         * @type {UIEditControl}
         * @private
         */
        this._editControl = editControl;
    }

    /**
     *
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     */
    // eslint-disable-next-line no-unused-vars
    click(imageData, elementList = null) {
        this._editControl.show(imageData);
    }
}
