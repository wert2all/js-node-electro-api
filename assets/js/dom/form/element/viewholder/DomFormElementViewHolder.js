/**
 * @class DomFormElementViewHolder
 *
 */
import DomStyles from "../../../utils/DomStyles";

export default class DomFormElementViewHolder {
    /**
     *
     * @param {HTMLElement} container
     * @param {HTMLElement} label
     */
    constructor(container, label) {
        /**
         *
         * @type {HTMLElement}
         * @private
         */
        this._container = container;
        /**
         *
         * @type {HTMLElement}
         * @private
         */
        this._label = label;
        /**
         *
         * @type {DomStyles}
         * @private
         */
        this._dom = new DomStyles();
        /**
         *
         * @type {string}
         * @private
         */
        this._errorStyle = "error";
    }

    /**
     *
     * @param {string} error
     */
    setError(error) {
        this._label.innerText = error;
        this._dom.addClass(this._container, this._errorStyle);
    }

    /**
     * @return void
     */
    cleanErrors() {
        this._dom.removeClass(this._container, this._errorStyle);
    }
}
