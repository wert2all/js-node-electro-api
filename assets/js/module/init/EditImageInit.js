import UIFormView from "../../ui/form/UIFormView";
import DomForm from "../../dom/form/DomForm";
import DomFormElement from "../../dom/form/element/DomFormElement";
import DomFormElementRadio from "../../dom/form/element/DomFormElementRadio";
import DomFormElementCheckbox from "../../dom/form/element/DomFormElementCheckbox";
import ImageEditFormRequestModifier from "../imagelist/form/ImageEditFormRequestModifier";
import UIMLLogs from "../mllogs/UIMLLogs";
import UIEditActionFabric from "../imagelist/item/actions/actions/fabric/UIEditActionFabric";
import AfterEditControlFabric from "../imagelist/control/after/AfterEditControlFabric";
import UIEditControl from "../imagelist/control/UIEditControl";
import CropperFactory from "../imagelist/control/cropper/CropperFactory";
import AfterEditShowAction from "../imagelist/control/after/AfterEditShowAction";
import CropperActionComposite from "../imagelist/control/cropper/CropperActionComposite";
import CropperAction from "../imagelist/control/cropper/CropperAction";
import MLLogsSelectors from "../mllogs/MLLogsSelectors";
import MLLogsElementsFactory from "../mllogs/MLLogsElementsFactory";

/**
 * @class EditImageInit
 */
export default class EditImageInit {
    /**
     *
     * @param {Document} document
     * @param {UIInterface} ui
     * @param {UIConfig} config
     */
    constructor(document, ui, config) {
        /**
         *
         * @type {Document}
         * @private
         */
        this._document = document;
        /**
         *
         * @type {UIInterface}
         * @private
         */
        this._ui = ui;
        /**
         *
         * @type {UIFormView}
         * @private
         */
        this._editImageViewForm = new UIFormView(
            this._createEditImageForm(document),
            this._document.querySelector("#modal_edit_image form.edit_image")
        );
        /**
         *
         * @type {UIMLLogs|null}
         * @private
         */
        this._mlLogs = null;
        /**
         *
         * @type {null|UIEditActionFabric}
         * @private
         */
        this._editActionFabric = null;
        /**
         *
         * @type {UIConfig}
         * @private
         */
        this._config = config;
    }

    /**
     *
     * @return {null|UIEditActionFabric}
     */
    getEditActionFabric() {
        return this._editActionFabric;
    }

    /**
     *
     * @return {UIMLLogs|null}
     */
    getMLLogs() {
        return this._mlLogs;
    }

    /**
     *
     * @param {Api} api
     * @param {AuthProviderInterface} authProvider
     */
    init(api, authProvider) {
        this._mlLogs = new UIMLLogs(
            this._editImageViewForm.getElement("edit_image_id"),
            this._document.querySelector("div.ml-logs-spinner"),
            new MLLogsElementsFactory(this._document.querySelector("table.ml-logs-table")),
            api,
            authProvider,
            this._ui.getNotify(),
            new MLLogsSelectors("tbody", "tr", "td span.uk-label", "td span.uk-badge", "td.ml-log-message")
        );
        this._mlLogs.init();
        const rotationFunc = (cropper, rotationVaLue) => {
            const rotationElement = this._editImageViewForm.getElement("edit_image_rotation");
            rotationElement.setValue((parseInt(rotationElement.getValue(), 10) + rotationVaLue).toString());
            return cropper.rotate(rotationVaLue);
        };

        const cropperAction = new CropperActionComposite([
            new CropperAction(this._document.querySelector("#modal_edit_image .uk-iconnav .crop_reset"), (cropper) =>
                cropper.reset()
            ),
            new CropperAction(this._document.querySelector("#modal_edit_image .uk-iconnav .crop_zoon_in"), (cropper) =>
                cropper.zoom(0.1)
            ),
            new CropperAction(this._document.querySelector("#modal_edit_image .uk-iconnav .crop_zoon_out"), (cropper) =>
                cropper.zoom(-0.1)
            ),
            new CropperAction(
                this._document.querySelector("#modal_edit_image .uk-iconnav .crop_rotate_right"),
                (cropper) => rotationFunc(cropper, 90)
            ),
            new CropperAction(
                this._document.querySelector("#modal_edit_image .uk-iconnav .crop_rotate_left"),
                (cropper) => rotationFunc(cropper, -90)
            ),
        ]);

        const afterShowAction = new AfterEditShowAction(this._editImageViewForm, cropperAction);

        const editControl = new UIEditControl(
            this._document.querySelector("#modal_edit_image img.image"),
            this._document.querySelector("#modal_edit_image button.edit_image_submit"),
            this._document.querySelector("#modal_edit_image"),
            this._ui.getUIKit(),
            this._editImageViewForm,
            api,
            this._ui.getNotify(),
            authProvider,
            new CropperFactory(this._config.getCropperOptions(), cropperAction)
        );
        editControl.setAfterShowAction(afterShowAction).init();

        this._editActionFabric = new UIEditActionFabric(editControl, new AfterEditControlFabric());
    }

    /**
     *
     * @param {Document} document
     * @return {DomForm}
     * @private
     */
    _createEditImageForm(document) {
        return new DomForm(
            {
                edit_image_id: new DomFormElement(this._document.querySelector("#edit_image_id")),
                edit_image_path: new DomFormElement(this._document.querySelector("#edit_image_path")),
                edit_image_type: new DomFormElementRadio(this._document.getElementsByName("image_type")),
                edit_image_ready: new DomFormElementCheckbox(this._document.querySelector("#edit_is_ready")),
                edit_image_rotation: new DomFormElement(this._document.querySelector("#edit_image_rotation")),
            },
            new ImageEditFormRequestModifier({
                id: "edit_image_id",
                type: "edit_image_type",
                isReady: "edit_image_ready",
                rotation: "edit_image_rotation",
            })
        );
    }
}
