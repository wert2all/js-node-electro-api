import UIElementInterface from '../../ui/interfaces/element/UIElementInterface';

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
     * @param {UIFormViewInterface} formView
     * @param {Api} api
     * @param {UINotifyInterface} notify
     */
    constructor(
        modalElement,
        avatarElement,
        userNameElement,
        userEmailElement,
        formView,
        UIKit,
        api,
        notify
    ) {
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
        /**
         * @type {UIkit}
         * @private
         */
        this._uikit = UIKit;
        /**
         *
         * @type {UIFormViewInterface}
         * @private
         */
        this._formView = formView;
        /**
         *
         * @type {Api}
         * @private
         */
        this._api = api;
        /**
         *
         * @type {UINotifyInterface}
         * @private
         */
        this._notify = notify;
    }

    clean() {
        //TODO
    }

    init() {
        this._uikit.modal(this._modalElement);
    }

    /**
     *
     * @param {DataGoogleAuthUser} userProfile
     */
    // eslint-disable-next-line no-unused-vars
    show(userProfile) {
        this._avatarElement.src = userProfile.getUserImage();
        this._userNameElement.innerHTML = userProfile.getUserName();
        this._userEmailElement.innerHTML = userProfile.getUserEmail();
        this._formView.showLoader();

        this._api.getUserProfile(userProfile, userProfile.getUserId())
            .then(response => {
                console.log(response);
                this._formView.hideLoader();
            })
            .catch(error => this._notify.error(error.message));
        // this._form
        //     .setElement('profile_personal_number', userProfile.getPersonalNumber())
        //     .setElement('profile_KC', userProfile.getKC())
        //     .setElement('profile_company_name', userProfile.getCompanyName())
        //     .setElement('profile_iban', userProfile.getIBAN())
        //     .setElement('profile_BIG', userProfile.getBIG());

        this._uikit.modal(this._modalElement).show();
    }
}
