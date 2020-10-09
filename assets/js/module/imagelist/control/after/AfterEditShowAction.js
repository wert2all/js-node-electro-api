import UIAfterControlInterface from "../../../../ui/control/UIAfterControlInterface";

/**
 * @class AfterEditShowAction
 * @type UIAfterControlInterface
 * @extends UIAfterControlInterface
 */
export default class AfterEditShowAction extends UIAfterControlInterface {
    /**
     *
     * @param {UIFormViewInterface} formView
     * @param {ICropperActionInterface} cropperAction
     */
    constructor(formView, cropperAction) {
        super();
        /**
         *
         * @type {ICropperActionInterface}
         * @private
         */
        this._cropperAction = cropperAction;
        /**
         *
         * @type {UIFormViewInterface}
         * @private
         */
        this._formView = formView;
    }

    exec() {
        const rotation = this._formView.getElement("edit_image_rotation").getValue();
        this._cropperAction.getCropper().rotate(rotation);
    }
}
