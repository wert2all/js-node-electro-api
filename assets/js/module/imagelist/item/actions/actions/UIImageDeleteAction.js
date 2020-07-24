import UIImageActionInterface from '../UIImageActionInterface';

/**
 * @class UIImageDeleteAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageDeleteAction extends UIImageActionInterface {
    /**
     *
     * @param {UIConfirm} confirm
     */
    constructor(confirm) {
        super();
        /**
         *
         * @type {UIConfirm}
         * @private
         */
        this._confirm = confirm;
    }

    /**
     *
     * @param {ImageData} imageData
     */
    click(imageData) {
        this._confirm.confirm('Delete image?')
            .then(() => {
                console.log('deleted');
                console.log(imageData);
            })
            .catch(() => true);
    }
}
