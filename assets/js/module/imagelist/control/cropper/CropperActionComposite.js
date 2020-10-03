import ICropperActionInterface from './ICropperActionInterface';

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
        this._actions
            .forEach(action => action.setCropper(cropper));
        return this;
    }
};
