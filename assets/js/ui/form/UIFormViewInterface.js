import DomFormInterface from "../../dom/form/DomFormInterface";

/**
 * @interface
 * @abstract
 * @class UIFormViewInterface
 */
export default class UIFormViewInterface extends DomFormInterface {
    /**
     * @return UIFormViewInterface
     */
    showLoader() {}

    /**
     * @return UIFormViewInterface
     */
    hideLoader() {}
}
