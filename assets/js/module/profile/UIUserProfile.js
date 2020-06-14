import UIElementInterface from '../../ui/interfaces/UIElementInterface';

/**
 * @class UIUserProfile
 * @extends UIElementInterface
 * @type UIElementInterface
 */

export default class UIUserProfile extends UIElementInterface {
    /**
     *
     * @param {Node} element
     * @param UIKit
     */
    constructor(element, UIKit) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._element = element;
        this._uikit = UIKit;
    }

    clean() {
        //TODO
    }

    init() {
        this._uikit.modal(this._element);
    }

    /**
     *
     * @param {UserProfile} userProfile
     */
    // eslint-disable-next-line no-unused-vars
    show(userProfile) {
        this._uikit.modal(this._element)
            .show();
    }
}
