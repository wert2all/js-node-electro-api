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
import Notify from './ui/notify/Notify';
import Api from './module/api/Api';
import ApiFetcher from './api/ApiFetcher';
import ApiUrlFactory from './utils/ApiUrlFactory';
import UIImageItem from './module/imagelist/UIImageItem';
import UIImageItemConfig from './module/imagelist/item/config/UIImageItemConfig';
import UIImageItemConfigRadio from './module/imagelist/item/config/UIImageItemConfigRadio';
import UIImageItemConfigProfile from './module/imagelist/item/config/UIImageItemConfigProfile';
import UIImageItemConfigActions from './module/imagelist/item/config/UIImageItemConfigActions';
import DomListenersModifier from './dom/utils/DomListenersModifier';
import UIImageActionModifier from './module/imagelist/item/actions/elements/UIImageActionModifier';
import UIImageActionsModifierComposite from './module/imagelist/item/actions/UIImageActionsModifierComposite';
import UIProfileViewFactory from './module/imagelist/item/profile/UIProfileViewFactory';
import UIPager from './ui/pager/UIPager';
import UIPageItem from './ui/pager/elements/UIPageItem';
import UIImageDownloadAction from './module/imagelist/item/actions/actions/UIImageDownloadAction';
import UIImageEditAction from './module/imagelist/item/actions/actions/UIImageEditAction';
import UIImageDeleteAction from './module/imagelist/item/actions/actions/UIImageDeleteAction';
import UIConfirm from './ui/dialog/UIConfirm';
import UIImagesViewHolder from './module/imagelist/UIImagesViewHolder';
import UIImageList from './module/imagelist/UIImageList';
import UIFormView from './ui/form/UIFormView';

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
    }

    init(window) {
        this._initUI(window.document);
        this._appendGApi(window);
        this._initIcons();
    }

    /**
     *
     * @param window
     * @private
     */
    _appendGApi(window) {
        const gaAuthConfig = this._config.getGoogleConfig().getAuthConfig();
        window.onGApiLoad = () => {
            window.gapi.load('client:auth2', {
                'callback': () => {
                    const authProvider = new GApiAuth(
                        gaAuthConfig,
                        window.gapi,
                        new AuthListener(this._ui)
                            .addAfterAuth(authProvider => {
                                const api = new Api(
                                    new ApiFetcher(),
                                    ApiUrlFactory.create(window)
                                );
                                this._makeImageList(api, authProvider);
                                this._makeAuthElements(
                                    authProvider,
                                    this._makeProfile(api, window.document)
                                );
                            })
                    );
                    authProvider.init();
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
            'John Doe'
        );

        const authElement = new UIAuthElementComposite([
            new UIAuthElement(
                new UiAuthNodesHolder(
                    new DomListenersModifier(),
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
                    new DomListenersModifier(),
                    null,
                    null,
                    document.querySelector('header ul.uk-navbar-nav a.profile_link'),
                    document.querySelector('header ul.uk-navbar-nav a.profile_sign_out'),
                ),
                defaultAuthValues
            ),
            new UIAuthElement(
                new UiAuthNodesHolder(
                    new DomListenersModifier(),
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
            }),
            new UIPager(
                document.querySelector('#system ul.uk-pagination'),
                new UIPageItem(
                    document.querySelector('#system ul.uk-pagination'),
                    'li a',
                    'li.uk-active span'
                )
            )
        );
    }

    /**
     *
     * @param {Document} document
     * @param {Api} api
     * @param {AuthProviderInterface} authProvider
     * @return {UIImageItem}
     * @private
     */
    _makeImageItem(document, api, authProvider) {
        const actionsConfig = new UIImageItemConfigActions(
            '.uk-card-footer .uk-icon-link.uk-icon.image-icon-download',
            '.uk-card-footer .uk-icon-link.uk-icon.image-icon-edit',
            '.uk-card-footer .uk-icon-link.uk-icon.image-icon-delete'
        );
        const uiItemConfig = new UIImageItemConfig(
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
                '.uk-card-header .uk-grid-small h2.uk-card-title',
                '.uk-card-header .uk-grid-small  a.image_profile_icon',
            )
        );
        const imageItem = new UIImageItem(
            document.querySelector('.one_image_card'),
            uiItemConfig,
            new UIImageActionsModifierComposite([
                new UIImageActionModifier(
                    new DomListenersModifier(),
                    actionsConfig.getDownloadSelector(),
                    new UIImageDownloadAction()
                ),
                new UIImageActionModifier(
                    new DomListenersModifier(),
                    actionsConfig.getEditSelector(),
                    new UIImageEditAction()
                ),
                new UIImageActionModifier(
                    new DomListenersModifier(),
                    actionsConfig.getDeleteSelector(),
                    new UIImageDeleteAction(
                        new UIConfirm(UIkit),
                        api,
                        authProvider,
                        this._ui.getNotify()
                    )
                )
            ]),
            new UIProfileViewFactory()
        );
        imageItem.init();
        return imageItem;
    }

    /**
     *
     * @param {Api} api
     * @param {AuthProviderInterface} authProvider
     * @private
     */
    _makeImageList(api, authProvider) {
        const imageItem = this._makeImageItem(
            document,
            api,
            authProvider
        );
        const imageViewHolder = new UIImagesViewHolder(
            this._ui.getContent(),
            this._ui.getGrid(),
            this._ui.getLoader(),
            this._ui.getNotify(),
            imageItem,
            this._ui.getPager()
        );
        new UIImageList(imageViewHolder, api, authProvider)
            .init();
    }

    /**
     *
     * @param {Api} api
     * @param {Document} document
     * @return {UIUserProfile}
     * @private
     */
    _makeProfile(api, document) {
        const profile = new UIUserProfile(
            document.querySelector('#modal_profile'),
            document.querySelector('#modal_profile img.profile-img'),
            document.querySelector('#modal_profile h4.uk-text-center.text-light'),
            document.querySelector('#modal_profile p.uk-text-small.uk-text-center'),
            new UIFormView(
                new DomForm({
                    'profile_personal_number':
                        new DomFormElement(
                            document.querySelector('#profile_personal_number')
                        ),
                    'profile_KC':
                        new DomFormElement(document.querySelector('#profile_KC')),
                    'profile_company_name':
                        new DomFormElement(
                            document.querySelector('#profile_company_name')
                        ),
                    'profile_iban':
                        new DomFormElement(document.querySelector('#profile_iban')),
                    'profile_BIG':
                        new DomFormElement(document.querySelector('#profile_BIG')),
                }),
                document.querySelector('#modal_profile form.profile_form'),
                this._ui.getLoader()
            ),
            UIkit,
            api,
            this._ui.getNotify()
        );
        profile.init();
        return profile;
    }

    /**
     *
     * @param {AuthProviderInterface} authProvider
     * @param {UIUserProfile} profile
     * @private
     */
    _makeAuthElements(authProvider, profile) {
        this._ui.getAuthElement().setAuthProvider(authProvider);
        this._ui.getAuthElement().init();
        this._ui.getAuthElement()
            .applyProfileClick(user => profile.show(user));
    }
}
