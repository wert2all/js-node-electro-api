import ICropperActionInterface from "./ICropperActionInterface";

/**
 * @class CropperActionComposite
 * @extends ICropperActionInterface
 * @type ICropperActionInterface
 */
export default class CropperActionComposite extends ICropperActionInterface {
    /**
     *
     * @param {ICropperActionInterface[]} actions
     */
    constructor(actions) {
        super();
        /**
         *
         * @type {ICropperActionInterface[]}
         * @private
         */
        this._actions = actions;
    }

    /**
     *
     * @param {Cropper} cropper
     * @return {CropperActionComposite}
     */
    setCropper(cropper) {
        this._actions.forEach((action) => action.setCropper(cropper));
        return this;
    }

    /**
     *
     * @return {Cropper}
     */
    getCropper() {
        return this._actions.pop().getCropper();
    }
}
