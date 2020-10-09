import UIImageActionInterface from "../UIImageActionInterface";

/**
 * @class UIImageEditAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageEditAction extends UIImageActionInterface {
    /**
     *
     * @param {UIEditControl} editControl
     * @param {AfterEditControlFabric} factory
     */
    constructor(editControl, factory) {
        super();
        /**
         *
         * @type {UIEditControl}
         * @private
         */
        this._editControl = editControl;
        /**
         * @type AfterEditControlFabric
         * @private
         */
        this._factory = factory;
    }

    /**
     *
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     */
    // eslint-disable-next-line no-unused-vars
    click(imageData, elementList = null) {
        this._editControl.setAfterSubmitAction(this._factory.create(elementList));
        this._editControl.show(imageData);
    }
}
