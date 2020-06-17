import GApiAuth from './google/auth/GApiAuth';
import DomScript from './dom/Script';
import AuthListener from './auth/AuthListener';
import UIkit from 'uikit/dist/js/uikit';
import UIIcons from 'uikit/dist/js/uikit-icons';
import UIHolder from './ui/UIHolder';
import UIAuthElementComposite from './ui/auth/UIAuthElementComposite';
import UIAuthElement from './ui/auth/UIAuthElement';
import UiAuthNodesHolder from './ui/auth/element/UiAuthNodesHolder';
import UiAuthElementDefaultValues from './ui/auth/element/UiAuthElementDefaultValues';
import UIUserProfile from './module/profile/UIUserProfile';
import DomForm from './dom/form/DomForm';
import DomFormElement from './dom/form/DomFormElement';
import UIGrid from './module/grid/UIGrid';

/**
 * @class UIInit
 */
export default class UIInit {
    /**
     *
     * @param {UIConfig} config
     */
    constructor(config) {
        /**
         *
         * @type {UIConfig}
         * @private
         */
        this._config = config;
        /**
         *
         * @type {UIInterface}
         * @private
         */
        this._ui = null;
        /**
         *
         * @type {UIUserProfile|null}
         * @private
         */
        this._uiProfile = null;
    }

    init(window) {
        this._initUI(window.document);
        this._initUIComponents();
        this._appendGApi(window);
        this._initIcons();
    }

    _appendGApi(window) {
        const gaAuthConfig = this._config.getGoogleConfig().getAuthConfig();
        const self = this;
        window.onGApiLoad = () => {
            window.gapi.load('client:auth2', {
                'callback': () => {
                    const authProvider = new GApiAuth(
                        gaAuthConfig,
                        window.gapi,
                        new AuthListener(this._ui)
                    );
                    authProvider.init();
                    self._ui.getAuthElement().setAuthProvider(authProvider);
                    self._ui.getAuthElement().init();
                }
            });
        };

        new DomScript(window.document)
            .create(this._config.getGoogleConfig().getApiUrl());
    }

    _initIcons() {
        UIkit.use(UIIcons);
    }

    /**
     *
     * @param {Document} document
     * @private
     */
    _initUI(document) {
        const defaultAuthValues = new UiAuthElementDefaultValues(
            '../assets/img/avatar.svg',
            'John Doe',
            (user) => {
                console.log(user);
                this._uiProfile.show(user);
            }
        );

        const authElement = new UIAuthElementComposite([
            new UIAuthElement(
                new UiAuthNodesHolder(
                    document.querySelector('#userprofile_container h4.uk-text-center'),
                    document.querySelector('#userprofile_container img.profile-img'),
                    document.querySelector(
                        '#userprofile_container ul.uk-nav a.profile_link'
                    ),
                    document.querySelector(
                        '#userprofile_container ul.uk-nav a.profile_sign_out'
                    ),
                ),
                defaultAuthValues
            ),
            new UIAuthElement(
                new UiAuthNodesHolder(
                    null,
                    null,
                    document.querySelector('header ul.uk-navbar-nav a.profile_link'),
                    document.querySelector('header ul.uk-navbar-nav a.profile_sign_out'),
                ),
                defaultAuthValues
            ),
            new UIAuthElement(
                new UiAuthNodesHolder(
                    null,
                    null,
                    document.querySelector('.bar-bottom a.profile_link'),
                    document.querySelector('.bar-bottom a.profile_sign_out'),
                ),
                defaultAuthValues
            )
        ]);
        const grid = new UIGrid(document.querySelector('#image_card_list'));

        this._ui = new UIHolder(authElement, grid);
    }

    _initUIComponents() {
        this._uiProfile = new UIUserProfile(
            document.querySelector('#modal_profile'),
            document.querySelector('#modal_profile img.profile-img'),
            document.querySelector('#modal_profile h4.uk-text-center.text-light'),
            document.querySelector('#modal_profile p.uk-text-small.uk-text-center'),
            new DomForm({
                'profile_personal_number':
                    new DomFormElement(
                        document.querySelector('#profile_personal_number')
                    ),
                'profile_KC':
                    new DomFormElement(document.querySelector('#profile_KC')),
                'profile_company_name':
                    new DomFormElement(document.querySelector('#profile_company_name')),
                'profile_iban':
                    new DomFormElement(document.querySelector('#profile_iban')),
                'profile_BIG':
                    new DomFormElement(document.querySelector('#profile_BIG')),
            }),
            UIkit
        );
        this._uiProfile.init();
    }
}
