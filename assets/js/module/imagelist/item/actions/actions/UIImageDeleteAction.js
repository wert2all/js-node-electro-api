import UIImageActionInterface from '../UIImageActionInterface';

/**
 * @class UIImageDeleteAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageDeleteAction extends UIImageActionInterface {
    /**
     *
     * @param {ImageData} imageData
     */
    click(imageData) {
        console.log('delete');
        console.log(imageData);
    }
}
