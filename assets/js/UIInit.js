import GApiAuth from './google/auth/GApiAuth';
import DomScript from './dom/Script';
import AuthListener from './auth/AuthListener';
import UIkit from 'uikit/dist/js/uikit';
import UIIcons from 'uikit/dist/js/uikit-icons';
import UIHolder from './ui/UIHolder';

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
        this._initUI();
        this._appendGApi(window);
        this._initIcons();
    }

    _appendGApi(window) {
        const gaAuthConfig = this._config.getGoogleConfig().getAuthConfig();
        window.onGApiLoad = () => {
            window.gapi.load('client:auth2', {
                'callback': () => {
                    new GApiAuth(gaAuthConfig, window.gapi, new AuthListener(this._ui))
                        .init();
                }
            });
        };

        new DomScript(window.document)
            .create(this._config.getGoogleConfig().getApiUrl());
    }

    _initIcons() {
        UIkit.use(UIIcons);
    }

    _initUI() {
        this._ui = new UIHolder();
    }
}
