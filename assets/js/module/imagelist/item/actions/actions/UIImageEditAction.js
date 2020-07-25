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
     * @param {UIElementListInterface} elementList
     */
    // eslint-disable-next-line no-unused-vars
    click(imageData, elementList = null) {
        console.log('edit');
        console.log(imageData);
    }
}
