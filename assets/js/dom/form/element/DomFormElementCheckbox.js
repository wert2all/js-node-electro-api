import DomFormElement from "./DomFormElement";

/**
 * @class DomFormElementCheckbox
 * @extends DomFormElement
 * @type DomFormElementInterface
 */
export default class DomFormElementCheckbox extends DomFormElement {
    /**
     *
     * @param {HTMLElement} element
     * @param {DomFormElementViewHolder|null} viewHolder
     * @param {DomFormElementValidatorInterface} validator
     */
    constructor(element, viewHolder = null, validator = null) {
        super(element, viewHolder, validator);
    }

    /**
     *
     * @param {string} value
     * @return DomFormElementInterface
     */
    setValue(value) {
        if (value === "true") {
            this._element.setAttribute("checked", "checked");
        } else {
            this._element.removeAttribute("checked");
        }
    }

    /**
     * @return {string}
     */
    getValue() {
        return this._element.checked ? "true" : "false";
    }
}
