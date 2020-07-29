import UIElementInterface from '../../ui/interfaces/element/UIElementInterface';
import UserProfile from '../../data/UserProfile';

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
        this._getModal();
    }

    /**
     *
     * @param {DataGoogleAuthUser} googleUser
     */
    // eslint-disable-next-line no-unused-vars
    show(googleUser) {
        this._avatarElement.src = googleUser.getUserImage();
        this._userNameElement.innerHTML = googleUser.getUserName();
        this._userEmailElement.innerHTML = googleUser.getUserEmail();
        this._formView.showLoader();
        this._getModal().show();
        this._setProfileData(googleUser);
    }

    /**
     *
     * @param {DataGoogleAuthUser} googleUser
     * @private
     */
    _setProfileData(googleUser) {
        this._api.getUserProfile(googleUser, googleUser.getUserId())
            .then(response => {
                if (response.getStatus()) {
                    this._formView.hideLoader();
                    const userProfile = UserProfile.factory(response);
                    this._formView
                        .setElement(
                            'profile_personal_number',
                            userProfile.getPersonalNumber()
                        )
                        .setElement('profile_KC', userProfile.getCs())
                        .setElement('profile_company_name', userProfile.getCompanyName())
                        .setElement('profile_iban', userProfile.getIban())
                        .setElement('profile_BIG', userProfile.getBic());

                } else {
                    throw new Error(response.getErrorMessage());
                }
            })
            .catch(error => {
                this._getModal().hide();
                return this._notify.error(error.message);
            });
    }

    /**
     *
     * @return {*}
     * @private
     */
    _getModal() {
        return this._uikit.modal(this._modalElement);
    }
}
