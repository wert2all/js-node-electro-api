import ImageUrlsManager from "./ImageUrlsManager";

/**
 * @class ImagesUrlProviderManagerFactory
 */
export default class ImagesUrlProviderManagerFactory {
    /**
     *
     * @param {Object<string,ImageUrlProviderInterface>} providers
     */
    constructor(providers) {
        /**
         *
         * @type {Object<string, ImageUrlProviderInterface>}
         * @private
         */
        this._providers = providers;
    }

    /**
     *
     * @return {ImageUrlsManager}
     */
    factory() {
        return new ImageUrlsManager(this._providers);
    }
}
