import ICropperActionInterface from './ICropperActionInterface';

/**
 * @class CropperAction
 * @extends ICropperActionInterface
 * @type ICropperActionInterface
 */
export default class CropperAction extends ICropperActionInterface {
    /**
     * @param {HTMLElement} element
     * @param {Function} clickFunction
     */
    constructor(element, clickFunction) {
        super();
        /**
         *
         * @type {HTMLElement}
         * @private
         */
        this._element = element;
        /**
         *
         * @type {Function}
         */
        this._clickFunction = clickFunction;
        /**
         *
         * @type {null|Cropper}
         * @private
         */
        this._cropper = null;
        this._init();
    }

    /**
     *
     * @returns {null|Cropper}
     */
    getCropper() {
        return this._cropper;
    }

    /**
     *
     * @param {Cropper} cropper
     * @return {CropperAction}
     */
    setCropper(cropper) {
        this._cropper = cropper;
        return this;
    }

    /**
     *
     * @private
     */
    _init() {
        this._element.addEventListener('click', () => this._clickFunction(this._cropper));
    }
}
