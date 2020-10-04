import UserProfile from '../../data/UserProfile';
import UIControlInterface from '../../ui/control/UIControlInterface';

/**
 * @class UIUserProfile
 * @extends UIControlInterface
 * @type UIControlInterface
 */

export default class UIUserProfile extends UIControlInterface {
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
     * @param {AuthProviderInterface} authProvider
     * @param {HTMLButtonElement} submitButton
     */
    constructor(
        modalElement,
        avatarElement,
        userNameElement,
        userEmailElement,
        formView,
        UIKit,
        api,
        notify,
        authProvider,
        submitButton
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
        /**
         *
         * @type {AuthProviderInterface}
         * @private
         */
        this._authProvider = authProvider;
        /**
         *
         * @type {HTMLButtonElement}
         * @private
         */
        this._submitButton = submitButton;
        /**
         *
         * @type {UIAfterControlInterface|null}
         * @private
         */
        this._afterControl = null;
    }

    clean() {
        //TODO
    }

    init() {
        this._getModal();
        this._submitButton.addEventListener('click', () => {
            if (this._formView.validate()) {
                this._formView.showLoader();
                this._api.updateProfile(
                    this._authProvider.getUserProfile(),
                    {
                        data: this._formView.getRequestFormData(),
                        userId: this._formView.getFormData().get('profile_user_id')
                    }
                )
                    .then(response => {
                        this._formView.hideLoader();
                        if (response.getStatus() === true) {
                            this._notify.success('Saved!');
                        } else {
                            this._notify.error(response.getErrorMessage());
                        }
                    })
                    .catch(error => {
                        this._formView.hideLoader();
                        this._notify.error(error.message);
                    });
            }
        });
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
        this._api.getUserProfile(
            this._authProvider.getUserProfile(),
            googleUser.getUserId()
        )
            .then(response => {
                if (response.getStatus()) {
                    this._formView.hideLoader();
                    const userProfile = UserProfile.factory(response);
                    this._formView
                        .setElement(
                            'profile_personal_number',
                            userProfile.getPersonalNumber()
                        )
                        .setElement('profile_user_id', googleUser.getUserId())
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

    /**
     *
     * @param {UIAfterControlInterface} action
     */
    setAfterSubmitAction(action) {
        this._afterControl = action;
    }
}
