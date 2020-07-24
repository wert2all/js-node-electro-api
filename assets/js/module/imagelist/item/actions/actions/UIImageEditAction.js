import UIImageActionInterface from '../UIImageActionInterface';

/**
 * @class UIImageEditAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageEditAction extends UIImageActionInterface {

    /**
     *
     * @param {ImageData} imageData
     */
    click(imageData) {
        console.log('edit');
        console.log(imageData);
    }
}
