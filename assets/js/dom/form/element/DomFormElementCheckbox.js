import DomFormElement from './DomFormElement';

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
        this._element.cheched = (value === 'true');
    }

    /**
     * @return {string}
     */
    getValue() {
        return (this._element.checked) ? 'true' : 'false';
    }

}
