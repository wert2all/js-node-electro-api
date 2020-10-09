import UIImageActionInterface from "../UIImageActionInterface";

/**
 * @class UIImageProfileAction
 * @extends UIImageActionInterface
 * @type UIImageActionInterface
 */
export default class UIImageProfileAction extends UIImageActionInterface {
    /**
     *
     * @param {UIUserProfile} uiProfile
     */
    constructor(uiProfile) {
        super();
        /**
         *
         * @type {UIUserProfile}
         * @private
         */
        this._profile = uiProfile;
    }

    /**
     *
     * @param {ImageData} imageData
     * @param {UIElementListInterface}  elementList
     */
    // eslint-disable-next-line no-unused-vars
    click(imageData, elementList) {
        this._profile.show(imageData.getUser());
    }
}
