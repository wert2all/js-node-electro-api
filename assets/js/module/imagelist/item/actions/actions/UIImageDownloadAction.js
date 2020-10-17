import UIImageActionInterface from "../UIImageActionInterface";

/**
 * @class UIImageDownloadAction
 * @type UIImageActionInterface
 * @extends UIImageActionInterface
 */
export default class UIImageDownloadAction extends UIImageActionInterface {
    /**
     *
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     */
    // eslint-disable-next-line no-unused-vars
    click(imageData, elementList = null) {
        window.open(imageData.getUrls()["original"], "_blank");
    }
}
