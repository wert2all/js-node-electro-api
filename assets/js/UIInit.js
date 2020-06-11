import GApiAuth from './google/auth/GApiAuth';
import DomScript from './dom/Script';
import AuthListener from './auth/AuthListener';

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
    }

    init(window) {
        this._appendGApi(window);
    }

    _appendGApi(window) {
        const gaAuthConfig = this._config.getGoogleConfig().getAuthConfig();
        window.onGApiLoad = () => {
            window.gapi.load('client:auth2', {
                'callback': () => {
                    new GApiAuth(gaAuthConfig, window.gapi, new AuthListener())
                        .init();
                }
            });
        };

        new DomScript(window.document)
            .create(this._config.getGoogleConfig().getApiUrl());
    }
}
