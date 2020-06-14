import UIElementInterface from '../../ui/interfaces/UIElementInterface';

/**
 * @class UIUserProfile
 * @extends UIElementInterface
 * @type UIElementInterface
 */

export default class UIUserProfile extends UIElementInterface {
    /**
     *
     * @param {Node} modalElement
     * @param {Node} avatarElement
     * @param {Node} userNameElement
     * @param {Node} userEmailElement
     * @param UIKit
     */
    constructor(modalElement, avatarElement, userNameElement, userEmailElement, UIKit) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._modalElement = modalElement;
        /**
         *
         * @type {Node}
         * @private
         */
        this._avatarElement = avatarElement;
        /**
         *
         * @type {Node}
         * @private
         */
        this._userNameElement = userNameElement;
        /**
         *
         * @type {Node}
         * @private
         */
        this._userEmailElement = userEmailElement;
        this._uikit = UIKit;
    }

    clean() {
        //TODO
    }

    init() {
        this._uikit.modal(this._modalElement);
    }

    /**
     *
     * @param {UserProfile} userProfile
     */
    // eslint-disable-next-line no-unused-vars
    show(userProfile) {
        this._avatarElement.src = userProfile.getUserImage();
        this._userNameElement.innerHTML = userProfile.getUserName();
        this._userEmailElement.innerHTML = userProfile.getUserEmail();

        this._uikit.modal(this._modalElement).show();
    }
}
