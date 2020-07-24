import UIImageActionInterface from '../UIImageActionInterface';

/**
 * @class UIImageDownloadAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageDownloadAction extends UIImageActionInterface {
    /**
     *
     * @param {ImageData} imageData
     */
    click(imageData) {
        window.location.href = imageData.getUrl();
    }
}
