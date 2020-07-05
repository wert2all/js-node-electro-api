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
import UILoader from './module/loader/UILoader';
import UIContentElement from './module/content/UIContentElement';
import UIImageList from './module/imagelist/UIImageList';
import Notify from './ui/notify/Notify';
import Api from './module/api/Api';
import ApiFetcher from './api/ApiFetcher';
import ApiUrlFactory from './utils/ApiUrlFactory';
import UIImageItem from './module/imagelist/UIImageItem';
import UIImageItemConfig from './module/imagelist/item/config/UIImageItemConfig';
import UIImageItemConfigRadio
    from './module/imagelist/item/config/UIImageItemConfigRadio';
import UIImageItemConfigProfile
    from './module/imagelist/item/config/UIImageItemConfigProfile';
import UIImageItemConfigActions
    from './module/imagelist/item/config/UIImageItemConfigActions';
import DomListeners from './dom/DomListeners';
import UIImageAction
    from './module/imagelist/item/actions/elements/UIImageAction';
import UIImageActionsComposite
    from './module/imagelist/item/actions/UIImageActionsComposite';

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
        /**
         *
         * @type {null|UIImageItem}
         * @private
         */
        this._uiImageItem = null;
    }

    init(window) {
        this._initUI(window.document);
        this._initUIComponents(window);
        this._appendGApi(window, this._uiImageItem);
        this._initIcons();
    }

    /**
     *
     * @param window
     * @param {UIImageItem} imageItem
     * @private
     */
    _appendGApi(window, imageItem) {
        const gaAuthConfig = this._config.getGoogleConfig().getAuthConfig();
        const self = this;
        window.onGApiLoad = () => {
            window.gapi.load('client:auth2', {
                'callback': () => {
                    const authProvider = new GApiAuth(
                        gaAuthConfig,
                        window.gapi,
                        new AuthListener(this._ui)
                            .addAfterAuth(authProvider => {
                                new UIImageList(
                                    this._ui.getContent(),
                                    this._ui.getGrid().clone(),
                                    this._ui.getLoader().clone(),
                                    this._ui.getNotify(),
                                    new Api(
                                        new ApiFetcher(),
                                        ApiUrlFactory.create(window)
                                    ),
                                    authProvider,
                                    imageItem
                                )
                                    .init();
                            })
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
                    new DomListeners(),
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
                    new DomListeners(),
                    null,
                    null,
                    document.querySelector('header ul.uk-navbar-nav a.profile_link'),
                    document.querySelector('header ul.uk-navbar-nav a.profile_sign_out'),
                ),
                defaultAuthValues
            ),
            new UIAuthElement(
                new UiAuthNodesHolder(
                    new DomListeners(),
                    null,
                    null,
                    document.querySelector('.bar-bottom a.profile_link'),
                    document.querySelector('.bar-bottom a.profile_sign_out'),
                ),
                defaultAuthValues
            )
        ]);
        const grid = new UIGrid(document.querySelector('#system .image_card_list'));
        const loader = new UILoader(document.querySelector('#system .loader'));
        const content = new UIContentElement(
            document.querySelector('#content .uk-container.uk-container-expand')
        );
        this._ui = new UIHolder(authElement, grid, loader, content,
            new Notify(UIkit, {
                pos: 'top-right'
            }));
    }

    /**
     *
     * @param {Window} window
     * @private
     */
    _initUIComponents(window) {
        const document = window.document;
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
        const actionsConfig = new UIImageItemConfigActions(
            '.uk-card-footer .uk-icon-link.uk-icon.image-icon-download',
            '.uk-card-footer .uk-icon-link.uk-icon.image-icon-edit',
            '.uk-card-footer .uk-icon-link.uk-icon.image-icon-delete'
        );
        this._uiImageItem = new UIImageItem(
            document.querySelector('.one_image_card'),
            new UIImageItemConfig(
                '.uk-card-body .uk-card-media-bottom img',
                '.uk-card .uk-card-badge',
                '.uk-card.uk-card-default.uk-card-small.uk-card-hover',
                '.uk-card-header p.uk-text-meta time',
                new UIImageItemConfigRadio(
                    '.uk-card-body label.uk-switch',
                    '.uk-card-body label.uk-switch input'
                ),
                new UIImageItemConfigProfile(
                    '.uk-card-header .uk-grid-small img.uk-border-circle',
                    '.uk-card-header .uk-grid-small h3.uk-card-title',
                    '.uk-card-header .uk-grid-small  a.uk-icon-link',
                )
            ),
            new UIImageActionsComposite([
                new UIImageAction(
                    new DomListeners(),
                    document,
                    actionsConfig.getDownloadSelector(),
                    (imageData) => window.location.href = imageData.getUrl()
                ),
                new UIImageAction(
                    new DomListeners(),
                    document,
                    actionsConfig.getEditSelector(),
                    (imageData) => {
                        console.log('edit');
                        console.log(imageData);
                    }
                ),
                new UIImageAction(
                    new DomListeners(),
                    document,
                    actionsConfig.getDeleteSelector(),
                    (imageData) => {
                        console.log('delete');
                        console.log(imageData);
                    }
                )
            ])
        );
        this._uiImageItem.init();
    }
}
