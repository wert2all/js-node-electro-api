import DomFormElement from "./DomFormElement";

/**
 * @class DomFormElementRadio
 * @extends DomFormElement
 * @type DomFormElementInterface
 */
export default class DomFormElementRadio extends DomFormElement {
    /**
     *
     * @param { NodeListOf<HTMLElement>} radios
     * @param {DomFormElementViewHolder|null} viewHolder
     * @param {DomFormElementValidatorInterface} validator
     */
    constructor(radios, viewHolder = null, validator = null) {
        super(radios[0], viewHolder, validator);
        /**
         *
         * @type {NodeListOf<HTMLElement>}
         * @private
         */
        this._radios = radios;
    }

    /**
     *
     * @param {string} value
     * @return DomFormElementInterface
     */
    setValue(value) {
        this._radios.forEach((radio) => {
            return (radio.checked = radio.value === value);
        });
    }

    /**
     * @return {string}
     */
    getValue() {
        const length = this._radios.length;
        for (let i = 0; i < length; i++) {
            if (this._radios[i].checked) {
                return this._radios[i].value;
            }
        }
    }
}
